import { z } from 'zod';

export const SectionCategorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
});

export type SectionCategory = z.infer<typeof SectionCategorySchema>;
