import { NavLink } from 'react-router'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { siteConfig, toTel } from '@/shared/config/site'
import { paths } from '@/shared/config/routes'
import { Button, Logo } from '@/shared/ui'
import { useDialogFocus } from '@/shared/lib/useDialogFocus'
import { useLockBodyScroll } from '@/shared/lib/useLockBodyScroll'
import { useDemoModal } from '@/features/demo-request'
import { aboutMenu, languages, primaryLinks } from '../model/nav'
import { Link } from 'react-router'

const list: Variants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }
const item: Variants = { hidden: { opacity: 0, x: 18 }, show: { opacity: 1, x: 0 } }

const Panel = ({ onClose }: { onClose: () => void }) => {
  const ref = useDialogFocus<HTMLDivElement>(true, onClose)
  const demo = useDemoModal()
  useLockBodyScroll(true)

  const openDemo = (source: string) => {
    onClose()
    demo.open(source)
  }

  return (
    <motion.div className="fixed inset-0 z-[90] lg:hidden" initial="hidden" animate="show" exit="hidden">
      <motion.div
        className="absolute inset-0 bg-[#283447]/70 backdrop-blur-[3px]"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-white px-5 pt-4 pb-8 outline-none md:w-[450px] md:px-[44px] md:pt-[35px]"
        variants={{ hidden: { x: '100%' }, show: { x: 0 } }}
        transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-brand-soft pb-3">
          <Link to={paths.home} aria-label="Signy — на главную" onClick={onClose}>
            <Logo className="[&_svg]:size-7 [&_span]:text-[22px]" />
          </Link>
          <button type="button" onClick={onClose} aria-label="Закрыть меню" className="cursor-pointer text-brand">
            <X className="size-7" strokeWidth={1.6} />
          </button>
        </div>

        <motion.ul variants={list} className="flex flex-col">
          <motion.li variants={item} className="flex flex-col border-b border-brand-soft py-4 md:py-5">
            {siteConfig.phones.map((phone) => (
              <a key={phone} href={toTel(phone)} className="nav-label py-2 text-[15px] tracking-[0.18em] text-night hover:text-brand">
                {phone}
              </a>
            ))}
          </motion.li>

          <motion.li variants={item} className="flex gap-4 border-b border-brand-soft py-5 md:py-6">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => openDemo('menu-login')}>
              Вход
            </Button>
            <Button size="sm" className="flex-1" onClick={() => openDemo('menu-signup')}>
              Регистрация
            </Button>
          </motion.li>

          <motion.li variants={item} className="py-2">
            <ul className="flex flex-col">
              {[...aboutMenu, ...primaryLinks].map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'nav-label block py-[18px] text-[15px] tracking-[0.2em] text-night transition-colors hover:text-brand',
                        isActive && !link.to.includes('#') && 'text-brand',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.li>

          <motion.li variants={item} className="mt-2 flex gap-7 border-t border-brand-soft pt-5">
            {languages
              .slice()
              .reverse()
              .map((lang) => (
                <span
                  key={lang.code}
                  className={cn('nav-label text-[15px] tracking-[0.2em]', lang.code === 'ru' ? 'font-semibold text-night' : 'text-muted')}
                  title={lang.available ? undefined : 'Скоро'}
                >
                  {lang.label}
                </span>
              ))}
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  )
}

export const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>
)
