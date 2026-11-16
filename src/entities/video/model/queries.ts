import { useQuery } from '@tanstack/react-query'
import { fetchVideos } from '../api/video.api'

export const useVideos = () => useQuery({ queryKey: ['videos'], queryFn: fetchVideos, staleTime: 10 * 60_000 })
