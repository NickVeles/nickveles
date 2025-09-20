"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
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
import { CheckIcon } from "lucide-react";
import Loading from "@/app/loading";
import { toast } from "sonner";
import TextLink from "./text-link";
import { sitemap } from "@/constants/sitemap";
import Link from "next/link";

export default function ContactFormCard() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Check if Upwork censoring is enabled
  const isUpworkCensored = !!process.env.NEXT_PUBLIC_UPWORK_CENSOR;

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
    form.setValue("captchaToken", token || "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onCaptchaExpired = () => {
    setCaptchaToken(null);
    form.setValue("captchaToken", "", {
      shouldValidate: true,
      shouldDirty: true,
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
        form.reset();
        recaptchaRef.current?.reset();
        setCaptchaToken(null);

        // Confirm submission
        toast.success("Message sent successfully", {
          description: "I'll message back as soon as possible!",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
      else {
        throw new Error(response.statusText || "Unknown");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to send message. Please try again.", { description: `Reason: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = form.formState.isValid && captchaToken !== null;

  return (
    <div className="relative w-full max-w-2xl">
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Contact Me</CardTitle>
          <CardDescription>
            Fill out the form below and I'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              inert={isUpworkCensored}
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
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
                        placeholder="e.g. john@example.com"
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
                        placeholder="e.g. Work Offer"
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
                        placeholder="e.g. Hello, I would like to discuss..."
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
                      <FormLabel className="inline">
                        I accept the{" "}
                        <TextLink
                          href="/tos"
                          target="_blank"
                          isIcon
                          iconSize={12}
                        >
                          terms and conditions
                        </TextLink>
                      </FormLabel>
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
                        className="scale-90 -translate-x-4 sm:scale-100 sm:translate-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || isSubmitting || isSubmitted}
              >
                {isSubmitted ? (
                  <CheckIcon />
                ) : isSubmitting ? (
                  <Loading className="size-6" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Upwork Overlay */}
      {isUpworkCensored && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col text-center p-6 max-w-md gap-2">
            <h3 className="text-lg font-semibold text-destructive">
              Contact Form Not Available
            </h3>
            <p className="text-muted-foreground">
              For Upwork users, please contact me directly through my Upwork
              profile instead of using this form.
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              {sitemap.socials.map(({ name, url, Icon }) => (
                <Button
                  key={name}
                  variant="outline"
                  className="size-12"
                  asChild
                >
                  <Link href={url} target="_blank" aria-label={name}>
                    {Icon && <Icon className="size-8 text-inherit" />}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
