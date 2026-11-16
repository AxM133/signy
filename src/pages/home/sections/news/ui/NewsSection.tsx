import { Link } from 'react-router'
import { PostDate } from '@/entities/post'
import { paths } from '@/shared/config/routes'
import { Reveal, SectionTitle, Skeleton } from '@/shared/ui'
import { NEWS_COUNT, useLatestPosts } from '../model/useLatestPosts'

export const NewsSection = () => {
  const { posts, isPending } = useLatestPosts()
  return (
    <section aria-labelledby="news-title" className="bg-mint">
      <div className="container-page py-12 lg:py-[54px]">
        <Reveal>
          <SectionTitle id="news-title">
            <Link to={paths.blog} className="transition-colors hover:text-brand">
              Интересно пишем про
            </Link>
          </SectionTitle>
        </Reveal>
        <ul className="mt-8 grid gap-8 md:grid-cols-3 lg:mt-12 lg:gap-[54px]">
          {isPending
            ? Array.from({ length: NEWS_COUNT }, (_, i) => (
                <li key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-[374/295] w-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-4/5" />
                </li>
              ))
            : posts.map((post, i) => (
                <li key={post.id}>
                  <Reveal delay={i * 0.12}>
                    <article className="group">
                      <Link to={paths.blogPost(post.slug)} className="block overflow-hidden rounded-[4px]" aria-label={post.title}>
                        <img
                          src={post.cover}
                          alt=""
                          width={374}
                          height={295}
                          loading="lazy"
                          className="aspect-[374/295] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />
                      </Link>
                      <div className="px-3.5 pt-3.5">
                        <PostDate date={post.date} className="text-[13px] text-ink" />
                        <h3 className="mt-2 max-w-[300px] text-[21px] leading-[26px] font-medium text-night">
                          <Link to={paths.blogPost(post.slug)} className="transition-colors hover:text-brand">
                            {post.title}
                          </Link>
                        </h3>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}
