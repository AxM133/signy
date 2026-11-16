export interface Plan {
  id: 'demo' | 'business' | 'pro' | 'individual'
  name: string
  documents: string
  /** `null` — цена по договорённости */
  price: string | null
  period: string | null
  ctaLabel: string
  featured?: boolean
}

export const plans: Plan[] = [
  { id: 'demo', name: 'Demo', documents: '30 документів', price: '0', period: 'грн/місяць', ctaLabel: 'Зарегистрироваться' },
  { id: 'business', name: 'Business', documents: '1 000 документів', price: '1 000', period: 'грн/рік', ctaLabel: 'Заказать', featured: true },
  { id: 'pro', name: 'Pro', documents: '10 000 документів', price: '9 000', period: 'грн/рік', ctaLabel: 'Заказать' },
  { id: 'individual', name: 'Individual', documents: 'Необмежена кількість документів', price: null, period: null, ctaLabel: 'Связаться с нами' },
]
