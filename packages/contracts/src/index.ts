import { z } from "zod";

export const VideoSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  renderUrl: z.string().url(),
  docUrl: z.string().url(),
  compositionId: z.string().min(1),
  publishedAt: z.string().datetime(),
});

export const VideosResponseSchema = z.object({
  videos: z.array(VideoSchema),
});

export const VideoResponseSchema = z.object({
  video: VideoSchema,
});

export const ApiErrorSchema = z.object({
  error: z.string(),
});

export type VideoDto = z.infer<typeof VideoSchema>;
export type VideosResponseDto = z.infer<typeof VideosResponseSchema>;
export type VideoResponseDto = z.infer<typeof VideoResponseSchema>;
export type ApiErrorDto = z.infer<typeof ApiErrorSchema>;
