import { PostDate } from '@/entities/post'
import type { Video } from '@/entities/video'

export const VideoCard = ({ video, onSelect }: { video: Video; onSelect: (id: string) => void }) => (
  <article className="group">
    <button
      type="button"
      onClick={() => onSelect(video.id)}
      className="relative block aspect-[575/340] w-full cursor-pointer overflow-hidden rounded-[2px]"
      aria-label={`Смотреть: ${video.title}`}
    >
      <img
        src={video.poster}
        alt=""
        width={575}
        height={340}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-night/0 transition-colors duration-300 group-hover:bg-night/10">
        <span className="relative flex size-[72px] items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(6,18,36,0.5)] transition-transform duration-300 group-hover:scale-110 lg:size-[102px]">
          <svg viewBox="0 0 24 24" className="size-[34%] translate-x-[8%] fill-brand" aria-hidden="true">
            <path d="M5 2.5v19a1 1 0 0 0 1.5.86l16-9.5a1 1 0 0 0 0-1.72l-16-9.5A1 1 0 0 0 5 2.5Z" />
          </svg>
        </span>
      </span>
    </button>
    <h3 className="mt-1.5 text-[22px] leading-7 font-medium text-night transition-colors group-hover:text-brand">{video.title}</h3>
    <PostDate date={video.date} className="block text-[13px] text-ink" />
  </article>
)
