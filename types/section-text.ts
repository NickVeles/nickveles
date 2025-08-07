import { z } from 'zod';
import { SectionCategorySchema } from './section-category';

export const SectionTextSchema = z.object({
  _id: z.string(),
  title: z.string(),
  paragraphs: z.string().array(),
  category: SectionCategorySchema,
});

export type SectionText = z.infer<typeof SectionTextSchema>;
