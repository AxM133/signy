import { PostDate } from '@/entities/post'
import { VideoPlayer, type Video } from '@/entities/video'
import { Skeleton } from '@/shared/ui'
import { playerLabels } from '../model/content'

export const PlayerSection = ({ video }: { video?: Video }) => {
  if (!video) {
    return (
      <div className="container-page mt-5" aria-busy="true" aria-label={playerLabels.loadingTitle}>
        <Skeleton className="h-10 w-96 max-w-full" />
        <Skeleton className="mt-3 aspect-[1230/590] w-full" />
      </div>
    )
  }
  return (
    <section aria-labelledby="featured-video" className="container-page mt-5 lg:mt-6">
      <h2 id="featured-video" className="text-[26px] leading-[34px] font-medium text-night lg:text-[34px] lg:leading-[44px]">
        {video.title}
      </h2>
      <PostDate date={video.date} className="mt-0.5 block text-[14px] text-ink" />
      <VideoPlayer
        key={video.id}
        youtubeId={video.youtubeId}
        poster={video.poster}
        title={video.title}
        className="mt-3 aspect-[1230/590] w-full rounded-[2px] max-sm:aspect-[4/3]"
        playClassName="size-[72px] lg:size-[102px]"
      />
    </section>
  )
}
