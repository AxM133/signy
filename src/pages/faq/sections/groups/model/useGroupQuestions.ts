import { useSingleOpen } from '@/entities/faq'

/** В популярных вопросах по умолчанию раскрыт второй — как в макете. */
export const useGroupQuestions = (popular: boolean) => useSingleOpen(popular ? 'p2' : null)

export const answersLabel = (n: number) => `Ответов на вопросы ${n}`
