import { z } from 'zod'
import { simulateLatency } from '@/shared/api'
import { video1, video2, video3, video4, videoMain } from '@/shared/assets/images'
import { videoSchema, type Video } from '../model/schema'

/** Все видеоинструкции сейчас ведут на один ролик — замените ID на свои, остальной код менять не нужно. */
const YOUTUBE_ID = '1VEogQzZ93U'

const db: Video[] = [
  { id: 'v-main', title: 'Как зарегистрироваться и подписать первый документ', date: '2020-05-28', poster: videoMain, youtubeId: YOUTUBE_ID },
  { id: 'v-2', title: 'Настройка шаблонов документов', date: '2020-03-05', poster: video1, youtubeId: YOUTUBE_ID },
  { id: 'v-3', title: 'Порядок согласования для нескольких участников', date: '2020-03-02', poster: video2, youtubeId: YOUTUBE_ID },
  { id: 'v-4', title: 'Загрузка XML и интеграция с 1С', date: '2020-02-26', poster: video3, youtubeId: YOUTUBE_ID },
  { id: 'v-5', title: 'Вход через Mobile ID', date: '2020-02-20', poster: video4, youtubeId: YOUTUBE_ID },
]

export const fetchVideos = (): Promise<Video[]> => simulateLatency(z.array(videoSchema).parse(db), 450)
