import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(100, {
      message: "Name must not exceed 100 characters long",
    }),
  email: z
    .email({
      message: "Please enter a valid email address",
    })
    .trim()
    .max(254, {
      message: "Email must not exceed 254 characters long",
    }),
  subject: z
    .string()
    .trim()
    .min(5, {
      message: "Subject must be at least 5 characters long",
    })
    .max(100, {
      message: "Subject must not exceed 100 characters long",
    }),
  message: z
    .string()
    .trim()
    .min(20, {
      message: "Message must be at least 20 characters long",
    })
    .max(2000, {
      message: "Message must not exceed 2000 characters long",
    }),
  hasAcceptedTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;
