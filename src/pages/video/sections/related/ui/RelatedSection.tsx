import { PostCard, PostCardSkeleton } from '@/entities/post'
import { Reveal, SectionTitle } from '@/shared/ui'
import { useRelatedPosts } from '../model/useRelatedPosts'

export const RelatedSection = () => {
  const { posts, isPending } = useRelatedPosts(3)
  return (
    <section aria-labelledby="related-title" className="container-page mt-14 pb-14 lg:mt-[72px] lg:pb-[72px]">
      <Reveal>
        <SectionTitle id="related-title" className="text-[26px] sm:text-[32px] lg:text-[36px]">
          Может быть интересно:
        </SectionTitle>
      </Reveal>
      <ul className="mt-8 grid gap-x-[61px] gap-y-12 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }, (_, i) => (
              <li key={i}>
                <PostCardSkeleton />
              </li>
            ))
          : posts.map((post, i) => (
              <li key={post.id}>
                <Reveal delay={i * 0.1}>
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
      </ul>
    </section>
  )
}
