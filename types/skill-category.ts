import { z } from 'zod';

export const SkillCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.number(),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
