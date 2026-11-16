import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { FaqQuestion } from '@/entities/faq'
import { paths } from '@/shared/config/routes'
import { Reveal, SectionTitle, Skeleton } from '@/shared/ui'
import { usePopularFaq } from '../model/usePopularFaq'

export const FaqPreviewSection = () => {
  const { questions, openId, toggle, isPending } = usePopularFaq()
  return (
    <section aria-labelledby="faq-preview-title" className="bg-sky">
      <div className="container-page py-12 lg:py-[44px]">
        <Reveal>
          <SectionTitle id="faq-preview-title" className="text-[26px] sm:text-[32px] lg:text-[36px]">
            Популярные вопросы и ответы на них
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-[560px] lg:mt-12">
          <ul className="flex flex-col gap-2.5">
            {isPending
              ? Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="h-6 w-full" />)
              : questions.map((q) => <FaqQuestion key={q.id} item={q} open={openId === q.id} onToggle={() => toggle(q.id)} />)}
          </ul>
          <Link
            to={paths.faq}
            className="group mt-6 inline-flex items-center gap-2 pl-[30px] text-[14px] font-semibold tracking-[0.12em] text-brand uppercase"
          >
            Все вопросы
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
