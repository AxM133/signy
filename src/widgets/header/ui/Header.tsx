import { Link } from 'react-router'
import { Menu } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { paths } from '@/shared/config/routes'
import { Logo } from '@/shared/ui'
import { useScrolled } from '@/shared/lib/useScrolled'
import { useMobileMenu } from '../model/useMobileMenu'
import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const scrolled = useScrolled(8)
  const menu = useMobileMenu()

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-16 transition-all duration-300 lg:h-20',
          scrolled ? 'bg-white/85 shadow-[0_8px_30px_-18px_rgba(6,18,36,0.4)] backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="container-page flex h-full items-center justify-between">
          <Link to={paths.home} aria-label="Signy — на главную" className="rounded-lg">
            <Logo className="max-lg:[&_svg]:size-8 max-lg:[&_span]:text-[26px]" />
          </Link>
          <DesktopNav />
          <button
            type="button"
            aria-label="Открыть меню"
            aria-haspopup="dialog"
            aria-expanded={menu.open}
            onClick={menu.toggle}
            className="cursor-pointer p-2 text-brand transition-transform active:scale-90 lg:hidden"
          >
            <Menu className="size-7" strokeWidth={1.6} />
          </button>
        </div>
      </header>
      <MobileMenu open={menu.open} onClose={menu.close} />
    </>
  )
}
