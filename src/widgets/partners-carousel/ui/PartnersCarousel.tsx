import { AnimatePresence, motion } from 'motion/react'
import { PartnerLogo } from '@/entities/partner'
import { Dots, Reveal, SectionTitle } from '@/shared/ui'
import { PAGES, usePartnersCarousel } from '../model/usePartnersCarousel'

export const PartnersCarousel = ({ id }: { id?: string }) => {
  const { page, setPage, items, pause, resume } = usePartnersCarousel()

  return (
    <section id={id} aria-labelledby="partners-title" className="bg-white">
      <div className="container-page py-12 lg:py-[54px]">
        <Reveal>
          <SectionTitle id="partners-title" className="text-[26px] sm:text-[32px] lg:text-[36px]">
            Друзья Signy
          </SectionTitle>
        </Reveal>
        <div
          className="mt-6 overflow-hidden lg:mt-9"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-2 items-center gap-x-4 gap-y-2 sm:grid-cols-4 sm:px-6 lg:px-10"
            >
              {items.map((partner) => (
                <li key={partner.id}>
                  <PartnerLogo partner={partner} />
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
        <Dots count={PAGES} active={page} onSelect={setPage} label="Страница партнёров" className="mt-7 lg:mt-9" />
      </div>
    </section>
  )
}
