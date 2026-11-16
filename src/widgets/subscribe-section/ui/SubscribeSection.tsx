import { cn } from '@/shared/lib/cn'
import { Reveal, SectionTitle } from '@/shared/ui'
import { SubscribeForm } from '@/features/subscribe'
import { subscribeCopy } from '../model/content'

interface SubscribeSectionProps {
  tone?: 'mint' | 'white'
  className?: string
}

export const SubscribeSection = ({ tone = 'mint', className }: SubscribeSectionProps) => (
  <section aria-labelledby="subscribe-title" className={cn(tone === 'mint' ? 'bg-mint' : 'bg-white', className)}>
    <div className="container-page py-14 text-center lg:py-[74px]">
      <Reveal>
        <SectionTitle id="subscribe-title" className="mx-auto max-w-[600px]">
          {subscribeCopy.title}
        </SectionTitle>
        <p className="mx-auto mt-8 max-w-[560px] text-[17px] leading-6 text-ink lg:mt-[38px]">
          {subscribeCopy.text}
        </p>
        <SubscribeForm className="mt-8 lg:mt-[30px]" />
      </Reveal>
    </div>
  </section>
)
