import { z } from 'zod';
import { ClientSchema } from './client';

export const TestimonialSchema = z.object({
  _id: z.string(),
  client: ClientSchema,
  date: z.string(),
  title: z.string().optional(),
  content: z.string(),
  proofUrl: z.string().optional(),
  score: z.number().min(0).max(1).optional(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;
