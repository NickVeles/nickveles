import { z } from 'zod';

export const AuthorSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  titles: z.string().array().optional(),
  image: z.any(),
});

export type Author = z.infer<typeof AuthorSchema>;
