import { usePosts } from '@/entities/post'

export const useFeaturedPost = () => {
  const { data, isPending } = usePosts('all')
  return { post: data?.[0], isPending }
}
