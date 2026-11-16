export const paths = {
  home: '/',
  pricing: '/#pricing',
  about: '/about',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  faq: '/faq',
  video: '/video',
  contacts: '/contacts',
} as const
