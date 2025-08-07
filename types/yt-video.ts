import { z } from 'zod';
import { SectionCategorySchema } from './section-category';

export const YouTubeVideoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  youtubeUrl: z.string(),
  category: SectionCategorySchema.optional(),
});

export type YouTubeVideo = z.infer<typeof YouTubeVideoSchema>;
