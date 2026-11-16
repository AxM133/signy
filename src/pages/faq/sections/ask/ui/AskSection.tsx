import { Reveal, SectionTitle } from '@/shared/ui'
import { MessageForm } from '@/features/send-message'
import { askContent } from '../model/content'

export const AskSection = () => (
  <section aria-labelledby="ask-title" className="bg-mint">
    <div className="container-page py-12 lg:py-[38px] lg:pb-[26px]">
      <Reveal className="text-center">
        <SectionTitle id="ask-title" className="mx-auto max-w-[800px]">
          {askContent.title}
        </SectionTitle>
        <p className="mt-3 text-[17px] text-ink">{askContent.text}</p>
      </Reveal>
      <Reveal delay={0.1} className="mx-auto mt-6 max-w-[420px] text-left">
        <MessageForm messageLabel="Твой вопрос:" centered />
      </Reveal>
    </div>
  </section>
)
