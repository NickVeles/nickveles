import { ContactFormSchema } from "@/types/contact-form";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = ContactFormSchema.parse(body);
    
    // Verify CAPTCHA
    const isCaptchaValid = await verifyCaptcha(validatedData.captchaToken);
    
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: "Invalid CAPTCHA" },
        { status: 400 }
      );
    }

    // TODO: Process the form data (send email, save to database, etc.)
    console.log("Form submitted successfully:", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      hasAcceptedTerms: validatedData.hasAcceptedTerms,
    });

    // Example: Send email using your preferred service
    // await sendEmail(validatedData);

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}