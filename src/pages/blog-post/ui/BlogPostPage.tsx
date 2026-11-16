import { Navigate } from 'react-router'
import { SubscribeSection } from '@/widgets/subscribe-section'
import { PageHead } from '@/shared/ui'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { usePostPage } from '../model/usePostPage'
import { ArticleSection, ArticleSkeleton } from '../sections/article'
import { PostNavigation } from '../sections/navigation'
import { ShareSection } from '../sections/share'

export const BlogPostPage = () => {
  const { post, prev, next, isPending, notFound, isError, refetch } = usePostPage()
  useDocumentTitle(post ? `${post.title} — Блог Signy` : 'Блог — Signy')

  if (notFound) return <Navigate to="/404" replace />

  return (
    <>
      <PageHead
        crumbs={[{ label: 'Блог', to: '/blog' }, { label: post?.title ?? '…' }]}
        title={post?.title ?? 'Загрузка…'}
      />
      {isPending && <ArticleSkeleton />}
      {isError && !notFound && (
        <p role="alert" className="container-page mt-8 text-[17px]">
          Не удалось загрузить статью.{' '}
          <button type="button" onClick={() => refetch()} className="cursor-pointer text-brand underline">
            Повторить
          </button>
        </p>
      )}
      {post && (
        <>
          <ArticleSection post={post} />
          <ShareSection title={post.title} />
          <PostNavigation prev={prev} next={next} />
        </>
      )}
      <SubscribeSection tone="mint" />
    </>
  )
}
