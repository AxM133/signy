import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import { Button, Dots } from '@/shared/ui'
import { useDemoModal } from '@/features/demo-request'
import { heroSlides } from '../model/slides'
import { useHeroSlider } from '../model/useHeroSlider'
import { HeroVisual } from './HeroVisual'

export const HeroSection = () => {
  const { index, goTo, setPaused } = useHeroSlider(heroSlides.length)
  const demo = useDemoModal()
  const slide = heroSlides[index]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Три этапа работы с Signy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative -mt-16 overflow-hidden bg-[radial-gradient(ellipse_70%_90%_at_38%_42%,#ffffff_0%,#eaf3fd_50%,#deeefc_100%)] pt-16 lg:-mt-20 lg:pt-20"
    >
      {/* декоративные пузыри */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float absolute top-[14%] left-[46%] size-14 rounded-full bg-brand/10" />
        <span className="animate-float-slow absolute bottom-[14%] left-[3%] hidden size-8 rounded-full border-2 border-brand/20 md:block" />
        <span className="animate-float absolute top-[22%] right-[6%] size-24 rounded-full bg-white/60 blur-xl" />
      </div>

      <div className="container-page relative pt-8 pb-20 md:grid md:min-h-[556px] md:grid-cols-[1fr_minmax(0,440px)] md:items-center md:gap-8 md:py-10 lg:min-h-[596px]">
        <div className="md:order-2">
          <HeroVisual />
        </div>

        <div className="md:order-1">
          <h1 className="h-display relative z-10 text-[24px] leading-[30px] text-night sm:text-[34px] sm:leading-[40px] lg:text-[42px] lg:leading-[48px]">
            Цифровой документооборот <br className="max-md:hidden" />в три этапа:
          </h1>

          <ol className="mt-4 flex items-center gap-2.5 text-[15px] lg:mt-[22px] lg:text-[20px]" aria-label="Этапы">
            {heroSlides.map((s, i) => (
              <li key={s.title} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span
                    className={cn('h-[2px] w-5 rounded bg-brand transition-all duration-500 lg:w-[22px]', i <= index ? 'opacity-100' : 'opacity-40')}
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Этап ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  className={cn(
                    'cursor-pointer transition-all duration-300',
                    i === index ? 'text-[24px] font-medium text-night lg:text-[28px]' : 'text-muted hover:text-brand',
                  )}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-5 min-h-[168px] md:max-w-[460px] lg:mt-6 lg:min-h-[148px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-[20px] leading-7 font-medium text-night lg:text-[24px]">{slide.title}</h2>
                <p className="mt-3 text-[15px] leading-[21px] text-ink max-md:pr-[30%] lg:mt-4 lg:text-[17px] lg:leading-[22px]">{slide.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center md:mt-7 md:justify-start">
            <Button size="lg" onClick={() => demo.open('hero')} className="max-md:h-12 max-md:px-8 max-md:text-[12px]">
              Попробовать бесплатно
            </Button>
          </div>
        </div>
      </div>

      <Dots count={heroSlides.length} active={index} onSelect={goTo} label="Этап" className="absolute inset-x-0 bottom-5 lg:bottom-7" />
    </section>
  )
}
