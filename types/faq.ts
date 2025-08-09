import { z } from 'zod';

export const FAQSchema = z.object({
  _id: z.string(),
  question: z.string(),
  answer: z.array(z.string()),
});

export type FAQ = z.infer<typeof FAQSchema>;
