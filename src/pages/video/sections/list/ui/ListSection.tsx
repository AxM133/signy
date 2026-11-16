import { Reveal, Skeleton } from '@/shared/ui'
import type { Video } from '@/entities/video'
import { LIST_SKELETON_COUNT } from '../model/constants'
import { VideoCard } from './VideoCard'

interface ListSectionProps {
  videos: Video[]
  loading: boolean
  onSelect: (id: string) => void
}

export const ListSection = ({ videos, loading, onSelect }: ListSectionProps) => (
  <section aria-label="Другие видеоинструкции" className="container-page mt-10 lg:mt-12">
    <ul className="grid gap-x-[56px] gap-y-10 sm:grid-cols-2">
      {loading
        ? Array.from({ length: LIST_SKELETON_COUNT }, (_, i) => (
            <li key={i}>
              <Skeleton className="aspect-[575/340] w-full" />
            </li>
          ))
        : videos.map((video, i) => (
            <li key={video.id}>
              <Reveal delay={(i % 2) * 0.1} y={20}>
                <VideoCard video={video} onSelect={onSelect} />
              </Reveal>
            </li>
          ))}
    </ul>
  </section>
)
