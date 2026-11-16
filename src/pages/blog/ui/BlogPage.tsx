import { PageHead } from '@/shared/ui'
import { SubscribeSection } from '@/widgets/subscribe-section'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { FeaturedSection } from '../sections/featured'
import { FeedSection } from '../sections/feed'

export const BlogPage = () => {
  useDocumentTitle('Блог — Signy')
  return (
    <>
      <PageHead crumbs={[{ label: 'Блог' }]} title="Интересно пишем про" />
      <FeaturedSection />
      <FeedSection />
      <SubscribeSection tone="mint" />
    </>
  )
}
