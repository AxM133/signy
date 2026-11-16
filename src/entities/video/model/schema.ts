import { z } from 'zod'
import { isSafeImageSrc } from '@/shared/lib/safeUrl'

export const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  poster: z.string().refine(isSafeImageSrc, 'Небезопасный адрес постера'),
  /** ID ролика на YouTube (11 символов) */
  youtubeId: z.string().regex(/^[\w-]{11}$/),
})
export type Video = z.infer<typeof videoSchema>
