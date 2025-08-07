import { z } from 'zod';
import { AuthorSchema } from './author';
import { ProjectCategorySchema } from './project-category';

export const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  author: AuthorSchema,
  editor: AuthorSchema.optional(),
  mainImage: z.any().optional(),
  category: ProjectCategorySchema,
  markdownContent: z.string(),
  url: z.string().optional(),
  repositoryUrl: z.string().optional(),
  publishedAt: z.string().optional(),
  editedAt: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
