import { useQuery } from '@tanstack/react-query'
import { fetchFaq } from '../api/faq.api'

export const useFaq = () => useQuery({ queryKey: ['faq'], queryFn: fetchFaq, staleTime: 10 * 60_000 })
