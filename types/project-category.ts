import { z } from 'zod';

export const ProjectCategorySchema = z.object({
  _id: z.string(),
  title: z.string(),
});

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
