export const siteConfig = {
  name: 'Signy',
  phones: ['0 800 750 643', '+380 44 334 56 43', '+380 44 338 86 43'],
  email: 'infosmartsign@smarttender.biz',
  facebook: 'https://www.facebook.com/',
  address: { street: 'пр-т Миколи Бажана, 14 А', city: 'Київ, 02072' },
  addressRu: 'пр-т Бажана, 14 А Киев, 02072',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Бажана+14А+Киев',
  year: new Date().getFullYear(),
} as const

export const toTel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`
