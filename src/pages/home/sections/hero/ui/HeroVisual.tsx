import { motion } from 'motion/react'
import { BadgeCheck, Gift } from 'lucide-react'
import { heroMan } from '@/shared/assets/images'

export const HeroVisual = () => (
  <div className="relative mx-auto w-full max-md:pointer-events-none max-md:absolute max-md:top-6 max-md:-right-2 max-md:w-[46%] max-md:max-w-[200px]">
    <div className="absolute top-[12%] left-[8%] size-[75%] rounded-full bg-white/70 blur-3xl" aria-hidden="true" />
    <motion.img
      src={heroMan}
      alt="Улыбающийся мужчина с ноутбуком в прыжке"
      width={416}
      height={579}
      fetchPriority="high"
      className="relative mx-auto h-auto w-full max-w-[416px] animate-float-slow drop-shadow-[0_30px_30px_rgba(16,100,229,0.18)]"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />

    <motion.div
      className="absolute top-[18%] -left-6 hidden items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-[0_18px_40px_-14px_rgba(16,100,229,0.45)] backdrop-blur lg:flex xl:-left-16"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
    >
      <span className="animate-float flex size-10 items-center justify-center rounded-full bg-brand text-white">
        <BadgeCheck className="size-6" />
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-semibold text-night">Документ подписан</span>
        <span className="block text-[12px] text-muted">1 секунда назад</span>
      </span>
    </motion.div>

    <motion.div
      className="absolute right-0 bottom-[16%] hidden items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-[0_18px_40px_-14px_rgba(16,100,229,0.45)] backdrop-blur lg:flex xl:-right-6"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.95, duration: 0.7 }}
    >
      <span className="animate-float-slow flex size-10 items-center justify-center rounded-full bg-[#ffb020] text-white">
        <Gift className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-semibold text-night">1000 подписей</span>
        <span className="block text-[12px] text-muted">в подарок при регистрации</span>
      </span>
    </motion.div>
  </div>
)
