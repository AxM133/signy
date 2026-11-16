import type { PostBlock } from '@/entities/post'

/** Контент статьи из структурированных блоков — без dangerouslySetInnerHTML. */
export const ArticleBody = ({ blocks }: { blocks: PostBlock[] }) => (
  <div className="gap-x-[64px] text-[18px] leading-[27px] text-ink lg:columns-2">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'h':
          return (
            <h2 key={i} className="mb-5 break-after-avoid text-[20px] leading-7 font-medium text-night">
              {block.text}
            </h2>
          )
        case 'image':
          return (
            <figure key={i} className="mb-7 break-inside-avoid">
              <img src={block.src} alt={block.alt} loading="lazy" className="w-full rounded-[2px] object-cover" />
            </figure>
          )
        default:
          return (
            <p key={i} className="mb-7">
              {block.text}
            </p>
          )
      }
    })}
  </div>
)
