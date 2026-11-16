import { Link } from 'react-router'
import { paths } from '@/shared/config/routes'
import { TagList } from '@/shared/ui'
import type { Post } from '../model/schema'
import { PostDate } from './PostMeta'

/** Карточка статьи для сетки блога и блока «Может быть интересно». */
export const PostCard = ({ post, priority = false }: { post: Post; priority?: boolean }) => (
  <article className="group flex flex-col">
    <Link to={paths.blogPost(post.slug)} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
      <img
        src={post.cover}
        alt=""
        width={370}
        height={371}
        loading={priority ? 'eager' : 'lazy'}
        className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
    </Link>
    <div className="mt-3 flex flex-col gap-2">
      <PostDate date={post.date} />
      <h3 className="text-[22px] leading-tight font-medium text-ink">
        <Link to={paths.blogPost(post.slug)} className="transition-colors hover:text-brand">
          {post.title}
        </Link>
      </h3>
      <TagList tags={post.tags.slice(0, 2)} />
      <p className="mt-1 line-clamp-3 text-[17px] leading-[22px] text-ink/90">{post.excerpt}</p>
    </div>
  </article>
)

export const PostCardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-3" aria-hidden="true">
    <div className="aspect-square w-full bg-slate-200/70" />
    <div className="h-4 w-24 rounded bg-slate-200/70" />
    <div className="h-6 w-4/5 rounded bg-slate-200/70" />
    <div className="h-14 w-full rounded bg-slate-200/70" />
  </div>
)
