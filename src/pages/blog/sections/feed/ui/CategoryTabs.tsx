import { ChevronDown } from 'lucide-react'
import { categoryFilters, type CategoryFilter } from '@/entities/post'
import { cn } from '@/shared/lib/cn'

interface CategoryTabsProps {
  value: CategoryFilter
  onChange: (value: CategoryFilter) => void
}

export const CategoryTabs = ({ value, onChange }: CategoryTabsProps) => (
  <>
    {/* desktop / tablet — вкладки */}
    <div role="tablist" aria-label="Категории" className="hidden gap-[56px] md:flex">
      {categoryFilters.map((c) => {
        const active = c.value === value
        return (
          <button
            key={c.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(c.value)}
            className={cn(
              'nav-label relative cursor-pointer py-2 text-[15px] tracking-[0.25em] text-night transition-colors hover:text-brand',
              'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:rounded after:bg-brand after:transition-transform after:duration-300',
              active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
            )}
          >
            {c.label}
          </button>
        )
      })}
    </div>

    {/* mobile — выпадающий список */}
    <label className="relative inline-flex items-center md:hidden">
      <span className="sr-only">Категория</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CategoryFilter)}
        className="nav-label cursor-pointer appearance-none bg-transparent py-2 pr-8 text-[15px] tracking-[0.25em] text-night outline-none"
      >
        {categoryFilters.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 size-4 text-night" aria-hidden="true" />
    </label>
  </>
)
