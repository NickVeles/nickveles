import { ContactFormSchema } from "@/types/contact-form";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max requests per X minutes per IP

function getClientIp(request: NextRequest): string {
  // Check various headers for the client IP
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  const clientIp = request.headers.get("x-client-ip");

  if (forwarded) {
    // x-forwarded-for may contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  return real || clientIp || "unknown";
}

async function checkRateLimit(
  ip: string,
): Promise<{ allowed: boolean; retryAfter?: number; remaining: number }> {
  const key = `rate_limit:${ip}`;
  const ttlSeconds = RATE_LIMIT_WINDOW_MS / 1000;

  try {
    // Increment count atomically
    const count = await redis.incr(key);

    if (count === 1) {
      // First request: set expiry window
      await redis.expire(key, ttlSeconds);
    }

    if (count > MAX_REQUESTS_PER_WINDOW) {
      const ttl = await redis.ttl(key);
      return {
        allowed: false,
        retryAfter: ttl > 0 ? ttl : ttlSeconds,
        remaining: 0,
      };
    }

    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - count };
  } catch (error) {
    console.error("Error checking rate limit:", error);
  }

  // In case of error, allow the request (fail open) with infinite remaining
  return { allowed: true, remaining: Infinity };
}

async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return false;
  }
}

async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `${data.name} <${process.env.ZOHO_SENDER_EMAIL}>`,
      to: [process.env.ZOHO_RECEIVER_EMAIL!],
      subject: `Contact Form: ${data.subject}`,
      replyTo: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="padding: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong> 
              <span style="color: #333;">${data.name}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong> 
              <a href="mailto:${data.email}" style="color: #0066cc;">${
                data.email
              }</a>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Subject:</strong> 
              <span style="color: #333;">${data.subject}</span>
            </p>
            <div style="margin: 20px 0;">
              <strong style="color: #555;">Message:</strong>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                <p style="color: #333; line-height: 1.6; margin: 0;">
                  ${data.message.replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888;">
            <p>This email was sent from your website's contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from your website's contact form.
      `,
    });

    if (error) {
      throw error;
    }

    return emailData;
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check rate limit
    const { allowed, retryAfter, remaining } = await checkRateLimit(clientIp);

    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(
              Date.now() + retryAfter! * 1000,
            ).toISOString(),
          },
        },
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = ContactFormSchema.parse(body);

    // Verify CAPTCHA
    const isCaptchaValid = await verifyCaptcha(validatedData.captchaToken);

    if (!isCaptchaValid) {
      return NextResponse.json({ error: "Invalid CAPTCHA" }, { status: 400 });
    }

    console.log("Form submitted successfully:", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      hasAcceptedTerms: validatedData.hasAcceptedTerms,
      ip: clientIp,
    });

    await sendEmail(validatedData);

    try {
      const ttl = await redis.ttl(`rate_limit:${clientIp}`);

      return NextResponse.json(
        { message: "Form submitted successfully" },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": String(Math.max(0, remaining)),
            "X-RateLimit-Reset": new Date(
              Date.now() + ttl * 1000,
            ).toISOString(),
          },
        },
      );
    } catch (error) {
      console.error("Error fetching TTL:", error);
    }

    // Fallback response if TTL fetch fails
    return NextResponse.json(
      { message: "Form submitted successfully" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
          "X-RateLimit-Remaining": String(Math.max(0, remaining)),
          "X-RateLimit-Reset": new Date().toISOString(),
        },
      },
    );
  } catch (error) {
    console.error("Error processing form:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
