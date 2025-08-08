"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactForm, ContactFormSchema } from "@/types/contact-form";
import { useTheme } from "next-themes";

export default function ContactFormCard() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      hasAcceptedTerms: false,
      captchaToken: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    // Update the form field as well
    form.setValue('captchaToken', token || '', { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  const onCaptchaExpired = () => {
    setCaptchaToken(null);
    form.setValue('captchaToken', '', { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  async function onSubmit(values: ContactForm) {
    setIsSubmitting(true);

    try {
      // Trim the fields before sending
      const trimmedValues = {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        hasAcceptedTerms: values.hasAcceptedTerms,
        captchaToken: values.captchaToken,
      };

      // Send form data along with captcha token
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedValues),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Ensure theme is loaded before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  const isFormValid = form.formState.isValid && captchaToken !== null;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the subject of your message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message here..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Accept Terms */}
            <FormField
              control={form.control}
              name="hasAcceptedTerms"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>I accept the terms and conditions</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* reCAPTCHA */}
            <FormField
              control={form.control}
              name="captchaToken"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={onCaptchaChange}
                      onExpired={onCaptchaExpired}
                      theme={resolvedTheme === "dark" ? "dark" : "light"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
