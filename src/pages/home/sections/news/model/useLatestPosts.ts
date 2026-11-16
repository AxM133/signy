import { usePosts } from '@/entities/post'

export const NEWS_COUNT = 3

export const useLatestPosts = () => {
  const query = usePosts('all')
  return { ...query, posts: query.data?.slice(0, NEWS_COUNT) ?? [] }
}
