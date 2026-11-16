import { paths } from '@/shared/config/routes'

export interface NavLinkItem {
  label: string
  to: string
}

/** Выпадающее меню «Про нас» */
export const aboutMenu: NavLinkItem[] = [
  { label: 'Про нас', to: paths.about },
  { label: 'Блог', to: paths.blog },
  { label: 'Видео', to: paths.video },
  { label: 'Вопросы', to: paths.faq },
]

export const primaryLinks: NavLinkItem[] = [
  { label: 'Цены', to: paths.pricing },
  { label: 'Контакты', to: paths.contacts },
]

export const languages = [
  { code: 'ru', label: 'РУС', available: true },
  { code: 'uk', label: 'УКР', available: false },
] as const
