import { Reveal } from '@/shared/ui'
import { shareTargets } from '../model/shareLinks'

export const ShareSection = ({ title }: { title: string }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href
  return (
    <Reveal className="mt-12 text-center lg:mt-14">
      <h2 className="h-display text-[22px] text-night">Поделится:</h2>
      <ul className="mt-5 flex items-center justify-center gap-9">
        {shareTargets.map(({ id, label, Icon, href }) => (
          <li key={id}>
            <a
              href={href(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Поделиться: ${label}`}
              className="flex size-10 items-center justify-center text-brand transition-all duration-300 hover:-translate-y-1.5 hover:scale-125 hover:text-brand-dark"
            >
              <Icon className="size-7" />
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
