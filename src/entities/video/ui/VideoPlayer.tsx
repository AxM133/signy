import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import { PlayButton } from '@/shared/ui'

interface VideoPlayerProps {
  poster: string
  /** ID ролика на YouTube */
  youtubeId: string
  title: string
  className?: string
  /** Размер кнопки Play, например `size-[102px]` */
  playClassName?: string
  imgClassName?: string
}

/**
 * Постер с кнопкой Play. YouTube-плеер подгружается только по клику
 * (через youtube-nocookie.com), поэтому до нажатия сторонние скрипты не грузятся.
 */
export const VideoPlayer = ({ poster, youtubeId, title, className, playClassName, imgClassName }: VideoPlayerProps) => {
  // Храним, какой именно ролик играет: при смене ролика плеер сам возвращается к постеру
  const [playingId, setPlayingId] = useState<string | null>(null)
  const playing = playingId === youtubeId

  return (
    <div className={cn('relative overflow-hidden bg-night', className)}>
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.iframe
            key="player"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="size-full border-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.div
            key="poster"
            className="group relative size-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={poster}
              alt=""
              loading="lazy"
              className={cn('size-full object-cover transition-transform duration-700 group-hover:scale-105', imgClassName)}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-night/0 transition-colors duration-300 group-hover:bg-night/10">
              <PlayButton onClick={() => setPlayingId(youtubeId)} label={`Смотреть: ${title}`} className={playClassName} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
