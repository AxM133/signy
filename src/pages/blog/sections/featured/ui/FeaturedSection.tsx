import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { PostDate } from '@/entities/post'
import { paths } from '@/shared/config/routes'
import { Reveal, Skeleton, TagList } from '@/shared/ui'
import { useFeaturedPost } from '../model/useFeaturedPost'

export const FeaturedSection = () => {
  const { post, isPending } = useFeaturedPost()

  if (isPending || !post) {
    return (
      <div className="container-page mt-6 grid gap-8 lg:grid-cols-[731px_1fr]" aria-busy="true">
        <Skeleton className="aspect-[731/422] w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-4/5" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  return (
    <Reveal className="container-page mt-6 lg:mt-7">
      <article className="group grid gap-6 lg:grid-cols-[minmax(0,731px)_1fr] lg:gap-[43px]">
        <Link to={paths.blogPost(post.slug)} className="block overflow-hidden rounded-[2px]" aria-label={post.title}>
          <img
            src={post.cover}
            alt=""
            width={731}
            height={422}
            fetchPriority="high"
            className="aspect-[731/422] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <div className="flex flex-col lg:pt-0">
          <PostDate date={post.date} className="text-[14px] leading-6 text-ink" />
          <h2 className="mt-1 text-[32px] leading-[42px] font-medium text-night lg:text-[36px]">
            <Link to={paths.blogPost(post.slug)} className="transition-colors hover:text-brand">
              {post.title}
            </Link>
          </h2>
          <TagList tags={post.tags} className="mt-3" />
          <p className="mt-6 text-[17px] leading-[26px] text-ink">{post.excerpt}</p>
          <Link
            to={paths.blogPost(post.slug)}
            className="group/link mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold tracking-[0.2em] text-night uppercase transition-colors hover:text-brand"
          >
            Читать
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
          </Link>
        </div>
      </article>
    </Reveal>
  )
}
