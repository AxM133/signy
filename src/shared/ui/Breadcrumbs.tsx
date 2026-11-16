import { Link } from 'react-router'
import { paths } from '@/shared/config/routes'

export interface Crumb {
  label: string
  to?: string
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const all: Crumb[] = [{ label: 'Signy', to: paths.home }, ...items]
  return (
    <nav aria-label="Хлебные крошки" className="text-[12px] text-ink/80">
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.to && i < all.length - 1 ? (
              <Link to={c.to} className="transition-colors hover:text-brand">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? 'page' : undefined} className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
