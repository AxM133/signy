import { usePosts } from '@/entities/post'

export const useRelatedPosts = (count = 3) => {
  const { data, isPending } = usePosts('all')
  return { posts: data?.slice(1, 1 + count) ?? [], isPending }
}
