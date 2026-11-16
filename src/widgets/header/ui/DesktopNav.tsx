import { Link, NavLink } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { siteConfig, toTel } from '@/shared/config/site'
import { Button } from '@/shared/ui'
import { useDemoModal } from '@/features/demo-request'
import { aboutMenu, languages, primaryLinks } from '../model/nav'
import { HeaderDropdown, dropdownItemClass } from './HeaderDropdown'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'nav-label relative py-2 text-night transition-colors hover:text-brand',
    'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:rounded after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100',
    isActive && 'text-brand',
  )

export const DesktopNav = () => {
  const demo = useDemoModal()
  return (
    <nav aria-label="Основное меню" className="hidden items-center gap-8 lg:flex xl:gap-[34px]">
      <HeaderDropdown label={siteConfig.phones[0]}>
        {(close) =>
          siteConfig.phones.map((phone) => (
            <a key={phone} href={toTel(phone)} onClick={close} className={dropdownItemClass}>
              {phone}
            </a>
          ))
        }
      </HeaderDropdown>

      <HeaderDropdown label="Про нас">
        {(close) =>
          aboutMenu.map((item) => (
            <NavLink key={item.to} to={item.to} end onClick={close} className={dropdownItemClass}>
              {item.label}
            </NavLink>
          ))
        }
      </HeaderDropdown>

      {primaryLinks.map((item) =>
        item.to.includes('#') ? (
          <Link key={item.to} to={item.to} className={linkClass({ isActive: false })}>
            {item.label}
          </Link>
        ) : (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        ),
      )}

      <div className="flex items-center gap-6">
        <Button variant="outline" onClick={() => demo.open('header-login')} className="h-10 px-[31px] text-[13px] tracking-[0.2em]">
          Вход
        </Button>
        <Button onClick={() => demo.open('header-signup')} className="h-10 px-8 text-[13px] tracking-[0.2em]">
          Регистрация
        </Button>
      </div>

      <HeaderDropdown label="РУС" align="right">
        {(close) =>
          languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              disabled={!lang.available}
              onClick={close}
              title={lang.available ? undefined : 'Украинская версия скоро появится'}
              className={cn(dropdownItemClass, !lang.available && 'cursor-not-allowed opacity-45 hover:bg-transparent hover:text-night')}
            >
              {lang.label}
            </button>
          ))
        }
      </HeaderDropdown>
    </nav>
  )
}
