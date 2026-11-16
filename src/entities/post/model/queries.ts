import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { fetchPost, fetchPosts } from '../api/post.api'
import type { CategoryFilter } from './schema'

export const postQueries = {
  list: (category: CategoryFilter = 'all') =>
    queryOptions({ queryKey: ['posts', 'list', category], queryFn: () => fetchPosts(category), staleTime: 5 * 60_000 }),
  detail: (slug: string) =>
    queryOptions({ queryKey: ['posts', 'detail', slug], queryFn: () => fetchPost(slug), staleTime: 5 * 60_000, retry: false }),
}

export const usePosts = (category: CategoryFilter = 'all') =>
  useQuery({ ...postQueries.list(category), placeholderData: keepPreviousData })

export const usePost = (slug: string) => useQuery(postQueries.detail(slug))
