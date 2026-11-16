import { Link } from 'react-router'
import { ArrowUp } from 'lucide-react'
import { siteConfig, toTel } from '@/shared/config/site'
import { paths } from '@/shared/config/routes'
import { Logo } from '@/shared/ui'
import { useDemoModal } from '@/features/demo-request'
import { footerNav, legalLinks } from '../model/links'

const linkClass = 'block w-fit cursor-pointer py-0.5 text-left text-[14px] text-white transition-colors duration-200 hover:text-brand-soft'

export const Footer = () => {
  const demo = useDemoModal()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-night text-white">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-[288px_148px_326px_296px_1fr] lg:gap-x-0 lg:py-[64px]">
        {/* логотип + © */}
        <div className="col-span-2 flex items-start justify-between lg:col-span-1 lg:flex-col">
          <Link to={paths.home} aria-label="Signy — на главную">
            <Logo variant="light" />
          </Link>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Наверх"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 transition-all hover:-translate-y-1 hover:border-brand-soft hover:text-brand-soft lg:hidden"
          >
            <ArrowUp className="size-5" strokeWidth={1.6} />
          </button>
          <p className="hidden text-[12px] text-white/45 lg:block">© {siteConfig.year} Signy</p>
        </div>

        {/* навигация */}
        <nav aria-label="Навигация в подвале" className="flex flex-col gap-0.5 lg:min-h-[158px]">
          {footerNav.primary.map((l) => (
            <Link key={l.label} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <div className="mt-5 flex flex-col gap-0.5">
            <button type="button" className={linkClass} onClick={() => demo.open('footer-login')}>
              Вход
            </button>
            <button type="button" className={linkClass} onClick={() => demo.open('footer-signup')}>
              Регистрация
            </button>
          </div>
          <span className="mt-auto hidden pt-4 text-[12px] text-white/45 lg:block">{legalLinks[0]}</span>
        </nav>

        <nav aria-label="Разделы" className="flex flex-col gap-0.5 lg:min-h-[158px]">
          {footerNav.secondary.map((l) => (
            <Link key={l.label} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <span className="mt-auto hidden pt-4 text-[12px] text-white/45 lg:block">{legalLinks[1]}</span>
        </nav>

        {/* контакты */}
        <div className="col-span-2 flex flex-col gap-0.5 lg:col-span-1">
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            {siteConfig.email}
          </a>
          <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Facebook
          </a>
        </div>

        <address className="col-span-2 flex flex-col gap-2.5 text-[14px] leading-6 text-white/80 not-italic lg:col-span-1">
          <a href={siteConfig.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}
          </a>
          {siteConfig.phones.map((phone) => (
            <a key={phone} href={toTel(phone)} className="transition-colors hover:text-white">
              {phone}
            </a>
          ))}
        </address>

        <div className="col-span-2 flex flex-wrap gap-x-10 gap-y-2 text-[12px] text-white/45 lg:hidden">
          {legalLinks.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <p className="col-span-2 text-[12px] text-white/45 lg:hidden">© {siteConfig.year} Signy</p>
      </div>
    </footer>
  )
}
