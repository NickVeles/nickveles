import { z } from "zod";
import { SkillCategorySchema } from "./skill-category";

export const SkillSchema = z.object({
  _id: z.string(),
  name: z.string(),
  category: SkillCategorySchema,
  tags: z.string().array(),
  points: z.number().optional().meta({
    deprecated: true,
    description:
      "This parameter is deprecated and new skills might come undefined. Use other parameters for sorting.",
  }),
  isHidden: z.boolean().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
