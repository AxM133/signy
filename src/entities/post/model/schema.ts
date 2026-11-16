import { z } from 'zod'
import { isSafeImageSrc, isValidSlug } from '@/shared/lib/safeUrl'

const imageSrc = z.string().refine(isSafeImageSrc, 'Небезопасный адрес картинки')

export const categorySchema = z.enum(['news', 'learning', 'laws'])
export type PostCategory = z.infer<typeof categorySchema>

export const postBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('p'), text: z.string() }),
  z.object({ type: z.literal('h'), text: z.string() }),
  z.object({ type: z.literal('image'), src: imageSrc, alt: z.string() }),
])
export type PostBlock = z.infer<typeof postBlockSchema>

export const postSchema = z.object({
  id: z.string(),
  slug: z.string().refine(isValidSlug, 'Недопустимый slug'),
  title: z.string(),
  /** ISO-дата `YYYY-MM-DD` */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: categorySchema,
  tags: z.array(z.string()),
  excerpt: z.string(),
  cover: imageSrc,
  content: z.array(postBlockSchema),
})
export type Post = z.infer<typeof postSchema>

export const categoryLabels: Record<PostCategory, string> = {
  news: 'Новости',
  learning: 'Обучение',
  laws: 'Законы',
}

export type CategoryFilter = PostCategory | 'all'
export const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'news', label: categoryLabels.news },
  { value: 'learning', label: categoryLabels.learning },
  { value: 'laws', label: categoryLabels.laws },
]

export interface PostWithSiblings {
  post: Post
  prev: Pick<Post, 'slug' | 'title'> | null
  next: Pick<Post, 'slug' | 'title'> | null
}
