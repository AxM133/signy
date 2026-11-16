import { paths } from '@/shared/config/routes'

export const footerNav = {
  primary: [
    { label: 'Про нас', to: paths.about },
    { label: 'Цены', to: paths.pricing },
  ],
  secondary: [
    { label: 'Блог', to: paths.blog },
    { label: 'Контакты', to: paths.contacts },
  ],
} as const

/** Юридические документы (страниц в макете нет — показываем как неактивный текст). */
export const legalLinks = ['Договір оферти', 'Безпека сервісу'] as const
