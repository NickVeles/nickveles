import { z } from 'zod';
import { SkillCategorySchema } from './skill-category';

export const SkillSchema = z.object({
  _id: z.string(),
  name: z.string(),
  category: SkillCategorySchema,
  tags: z.string().array(),
  points: z.number(),
});

export type Skill = z.infer<typeof SkillSchema>;
