import { VideoPlayer } from '@/entities/video'
import { Reveal, SectionTitle, Skeleton } from '@/shared/ui'
import { useIntroVideo } from '../model/useIntroVideo'

export const VideoIntroSection = () => {
  const { youtubeId, poster, title, isPending } = useIntroVideo()
  return (
    <section aria-labelledby="intro-video-title" className="bg-white">
      <div className="container-page py-12 lg:py-[56px]">
        <Reveal>
          <SectionTitle id="intro-video-title" className="text-[26px] sm:text-[32px] lg:text-[36px]">
            Познакомимся в живую?
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-[734px] lg:mt-10">
          {isPending || !youtubeId ? (
            <Skeleton className="aspect-[734/450] w-full" />
          ) : (
            <VideoPlayer
              youtubeId={youtubeId}
              poster={poster}
              title={title}
              className="aspect-[734/450] w-full rounded-[4px] shadow-[0_30px_60px_-28px_rgba(6,18,36,0.5)]"
              playClassName="size-[72px] sm:size-[102px]"
            />
          )}
        </Reveal>
      </div>
    </section>
  )
}
