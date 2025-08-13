import { z } from 'zod';
import { AuthorSchema } from './author';
import { ProjectCategorySchema } from './project-category';
import { urlFor } from '@/lib/sanity-image';

export const ProjectDataSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  author: AuthorSchema,
  editor: AuthorSchema.optional(),
  mainImage: z.unknown().optional(),
  category: ProjectCategorySchema,
  markdownContent: z.string(),
  url: z.string().optional(),
  repositoryUrl: z.string().optional(),
  publishedAt: z.string().optional(),
  editedAt: z.string().optional(),
});

export const ProjectSchema = ProjectDataSchema.extend({
  mainImageUrl: z.url().optional(),
});

export type ProjectData = z.infer<typeof ProjectDataSchema>;
export type Project = z.infer<typeof ProjectSchema>;

export function processProject(data: ProjectData): Project {
  return {
    ...data,
    mainImageUrl: data.mainImage ? urlFor(data.mainImage).width(450).height(300).url() : undefined,
  };
}

export function processProjects(data: ProjectData[]): Project[] {
  return data.map(processProject);
}
