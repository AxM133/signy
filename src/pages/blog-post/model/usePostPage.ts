import { useParams } from 'react-router'
import { usePost } from '@/entities/post'
import { ApiError } from '@/shared/api'
import { isValidSlug } from '@/shared/lib/safeUrl'

export const usePostPage = () => {
  const { slug = '' } = useParams()
  // Параметр из адресной строки — недоверенный ввод: невалидный slug даже не отправляем в запрос
  const validSlug = isValidSlug(slug)
  const query = usePost(validSlug ? slug : '')
  const notFound = !validSlug || (query.error instanceof ApiError && query.error.status === 404)
  return { ...query, notFound, post: query.data?.post, prev: query.data?.prev ?? null, next: query.data?.next ?? null }
}
