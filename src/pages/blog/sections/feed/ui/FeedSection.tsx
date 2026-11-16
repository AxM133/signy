import { AnimatePresence, motion } from 'motion/react'
import { PostCard, PostCardSkeleton } from '@/entities/post'
import { Button } from '@/shared/ui'
import { PAGE_SIZE, useBlogFeed } from '../model/useBlogFeed'
import { CategoryTabs } from './CategoryTabs'

export const FeedSection = () => {
  const feed = useBlogFeed()

  return (
    <section aria-label="Статьи" className="container-page mt-8 pb-14 lg:mt-5 lg:pb-[72px]">
      <CategoryTabs value={feed.category} onChange={feed.setCategory} />

      <div aria-live="polite" aria-busy={feed.isPending}>
        {feed.isError && (
          <p role="alert" className="mt-8 text-[17px]">
            Не удалось загрузить статьи.{' '}
            <button type="button" onClick={() => feed.refetch()} className="cursor-pointer text-brand underline">
              Повторить
            </button>
          </p>
        )}

        {feed.isPending ? (
          <ul className="mt-6 grid gap-x-[61px] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i}>
                <PostCardSkeleton />
              </li>
            ))}
          </ul>
        ) : feed.visible.length === 0 ? (
          <p className="mt-10 text-[17px] text-muted">В этой категории пока нет статей.</p>
        ) : (
          <motion.ul
            key={feed.category}
            className="mt-6 grid gap-x-[61px] gap-y-12 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <AnimatePresence>
              {feed.visible.map((post, i) => (
                <motion.li
                  key={post.id}
                  layout
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PostCard post={post} priority={i < 3} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      {feed.hasMore && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" onClick={feed.showMore}>
            Показать ещё {Math.min(PAGE_SIZE, feed.total - feed.visible.length)}
          </Button>
        </div>
      )}
    </section>
  )
}
