import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { categoryFilters, usePosts, type CategoryFilter } from '@/entities/post'

export const PAGE_SIZE = 9

const isCategory = (v: string | null): v is CategoryFilter => categoryFilters.some((c) => c.value === v)

/**
 * Лента блога: фильтр живёт в URL (`?category=news`) — ссылкой можно поделиться,
 * кнопка «назад» работает. «Показать ещё» подгружает по 9 статей.
 */
export const useBlogFeed = () => {
  const [params, setParams] = useSearchParams()
  const raw = params.get('category')
  const category: CategoryFilter = isCategory(raw) ? raw : 'all'

  const [limit, setLimit] = useState({ category, count: PAGE_SIZE })
  const count = limit.category === category ? limit.count : PAGE_SIZE

  const query = usePosts(category)
  const all = usePosts('all').data
  const featuredId = all?.[0]?.id
  const posts = (query.data ?? []).filter((p) => p.id !== featuredId)

  const setCategory = useCallback(
    (next: CategoryFilter) => {
      setParams(next === 'all' ? {} : { category: next }, { replace: true, preventScrollReset: true })
    },
    [setParams],
  )
  const showMore = useCallback(() => setLimit({ category, count: count + PAGE_SIZE }), [category, count])

  return {
    category,
    setCategory,
    visible: posts.slice(0, count),
    hasMore: posts.length > count,
    showMore,
    total: posts.length,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  }
}
