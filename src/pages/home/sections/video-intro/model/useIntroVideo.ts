import { homeVideo } from '@/shared/assets/images'
import { useVideos } from '@/entities/video'

export const useIntroVideo = () => {
  const { data, isPending } = useVideos()
  const video = data?.[0]
  return { isPending, youtubeId: video?.youtubeId, poster: homeVideo, title: 'Знакомство с Signy' }
}
