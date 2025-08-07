import { z } from 'zod';

export const AuthorSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  titles: z.string().array().optional(),
  image: z.any(),
});

// Optionally, you can infer the TypeScript type from the schema:
export type Author = z.infer<typeof AuthorSchema>;
