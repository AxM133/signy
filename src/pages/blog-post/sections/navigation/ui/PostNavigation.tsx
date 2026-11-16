import { Link } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { paths } from '@/shared/config/routes'
import { cn } from '@/shared/lib/cn'
import type { PostSibling } from '../model/types'

const NavCard = ({ item, dir }: { item: PostSibling | null; dir: 'prev' | 'next' }) => {
  if (!item) return <span />
  const next = dir === 'next'
  return (
    <Link
      to={paths.blogPost(item.slug)}
      className={cn('group flex max-w-[300px] flex-col gap-4', next ? 'items-end text-right' : 'items-start text-left')}
    >
      <span className={cn('h-display text-[20px] leading-6 transition-colors lg:text-[22px]', next ? 'text-brand' : 'text-night group-hover:text-brand')}>
        {item.title}
      </span>
      <span className="flex items-center gap-2 text-[12px] text-ink">
        {!next && <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1.5" />}
        {next ? 'Следующая статья' : 'Предыдущая статья'}
        {next && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />}
      </span>
    </Link>
  )
}

export const PostNavigation = ({ prev, next }: { prev: PostSibling | null; next: PostSibling | null }) => (
  <nav aria-label="Другие статьи" className="container-page mt-10 mb-14 grid grid-cols-2 gap-6 lg:mt-12 lg:mb-[72px] lg:px-[120px]">
    <NavCard item={prev} dir="prev" />
    <div className="flex justify-end">
      <NavCard item={next} dir="next" />
    </div>
  </nav>
)
