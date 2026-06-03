import { ContactFormSchema } from "@/types/contact-form";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import {
  CONFIRMATION_FROM_NAME,
  CONFIRMATION_SUBJECT,
  contactConfirmationHtml,
  contactConfirmationText,
  contactNotificationHtml,
  contactNotificationText,
} from "./messages";

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

// Thin wrapper around Resend that surfaces API errors as thrown exceptions so
// callers can rely on promise rejection (e.g. with Promise.allSettled).
async function sendEmail(options: Parameters<typeof resend.emails.send>[0]) {
  const { data: emailData, error } = await resend.emails.send(options);

  if (error) {
    throw error;
  }

  return emailData;
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

    const { name, email, subject, message } = validatedData;

    // Send the owner notification and the user confirmation concurrently.
    // The confirmation is treated as non-fatal: if it fails the message was
    // still received, the sender just won't get an acknowledgement.
    const [notification, confirmation] = await Promise.allSettled([
      sendEmail({
        from: `${name} <${process.env.NOREPLY_EMAIL!}>`,
        to: [process.env.TO_EMAIL!],
        subject: `Contact Form: ${subject}`,
        replyTo: email,
        html: contactNotificationHtml({ name, email, subject, message }),
        text: contactNotificationText({ name, email, subject, message }),
      }),
      sendEmail({
        from: `${CONFIRMATION_FROM_NAME} <${process.env.NOREPLY_EMAIL!}>`,
        to: [email],
        subject: CONFIRMATION_SUBJECT,
        html: contactConfirmationHtml({ name, subject, message }),
        text: contactConfirmationText({ name, subject, message }),
      }),
    ]);

    if (notification.status === "rejected") {
      console.error(
        "Error sending notification email with Resend:",
        notification.reason,
      );
      throw notification.reason;
    }

    if (confirmation.status === "rejected") {
      // Non-fatal: the owner was notified, the sender just won't get a copy.
      console.error(
        "Error sending confirmation email with Resend:",
        confirmation.reason,
      );
    }

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
