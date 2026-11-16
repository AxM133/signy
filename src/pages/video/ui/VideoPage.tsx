import { SubscribeSection } from '@/widgets/subscribe-section'
import { PageHead } from '@/shared/ui'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { useSelectedVideo } from '../model/useSelectedVideo'
import { ListSection } from '../sections/list'
import { PlayerSection } from '../sections/player'
import { RelatedSection } from '../sections/related'

export const VideoPage = () => {
  const { selected, others, select, isPending, isError, refetch } = useSelectedVideo()
  useDocumentTitle('Видео инструкции — Signy')

  return (
    <>
      <PageHead crumbs={[{ label: 'Видео инструкции' }]} title="Видео инструкции" />
      {isError ? (
        <p role="alert" className="container-page mt-8 text-[17px]">
          Не удалось загрузить видео.{' '}
          <button type="button" onClick={() => refetch()} className="cursor-pointer text-brand underline">
            Повторить
          </button>
        </p>
      ) : (
        <>
          <PlayerSection video={selected} />
          <ListSection videos={others} loading={isPending} onSelect={select} />
        </>
      )}
      <RelatedSection />
      <SubscribeSection tone="mint" />
    </>
  )
}
