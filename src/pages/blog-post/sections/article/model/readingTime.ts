import type { PostBlock } from '@/entities/post'

const WORDS_PER_MINUTE = 180

/** Оценка времени чтения по тексту блоков (минимум 1 минута). */
export const readingMinutes = (blocks: PostBlock[]) => {
  const words = blocks.reduce((sum, b) => (b.type === 'image' ? sum : sum + b.text.split(/\s+/).filter(Boolean).length), 0)
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
