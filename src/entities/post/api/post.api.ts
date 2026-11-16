import { simulateLatency, ApiError } from '@/shared/api'
import { postSchema, type CategoryFilter, type Post, type PostWithSiblings } from '../model/schema'
import { postsDb } from './mock-posts'
import { z } from 'zod'

const parsed = z.array(postSchema).parse(postsDb)

export const fetchPosts = async (category: CategoryFilter = 'all'): Promise<Post[]> => {
  const list = category === 'all' ? parsed : parsed.filter((p) => p.category === category)
  return simulateLatency(list, 500)
}

export const fetchPost = async (slug: string): Promise<PostWithSiblings> => {
  const index = parsed.findIndex((p) => p.slug === slug)
  if (index === -1) throw new ApiError('Статья не найдена', 404)
  const pick = (p?: Post) => (p ? { slug: p.slug, title: p.title } : null)
  return simulateLatency(
    { post: parsed[index], prev: pick(parsed[index + 1]), next: pick(parsed[index - 1]) },
    450,
  )
}
