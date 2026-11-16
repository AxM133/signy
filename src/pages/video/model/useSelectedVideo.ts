import { useState } from 'react'
import { useVideos } from '@/entities/video'

/** Выбранное видео живёт на уровне страницы: им делятся секции «плеер» и «список». */
export const useSelectedVideo = () => {
  const { data, isPending, isError, refetch } = useVideos()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const videos = data ?? []
  const selected = videos.find((v) => v.id === selectedId) ?? videos[0]

  const select = (id: string) => {
    setSelectedId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { videos, selected, others: videos.filter((v) => v.id !== selected?.id), select, isPending, isError, refetch }
}
