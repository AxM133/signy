import { PostDate, type Post } from '@/entities/post'
import { Reveal, TagList } from '@/shared/ui'
import { readingMinutes } from '../model/readingTime'
import { ArticleBody } from './ArticleBody'

export const ArticleSection = ({ post }: { post: Post }) => (
  <article className="container-page">
    <Reveal y={12} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
      <PostDate date={post.date} className="text-[15px] text-ink" />
      <TagList tags={post.tags} />
      <span className="text-[14px] text-muted">{readingMinutes(post.content)} мин чтения</span>
    </Reveal>
    <div className="mt-6 lg:mt-7">
      <ArticleBody blocks={post.content} />
    </div>
  </article>
)
