import { Gauge, PiggyBank, ThumbsUp, type LucideIcon } from 'lucide-react'

export interface Benefit {
  title: string
  lines: string[]
  Icon: LucideIcon
}

export const benefits: Benefit[] = [
  { title: 'Моментально', lines: ['Никаких задержек.', '1 секунда на подписание'], Icon: Gauge },
  { title: 'Глобально', lines: ['Сервис доступен 24\\7', 'со всех устройств'], Icon: ThumbsUp },
  { title: 'Экономно', lines: ['В 30 раз дешевле чем', 'почта и курьеры'], Icon: PiggyBank },
]
