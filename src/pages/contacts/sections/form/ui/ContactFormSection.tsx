import { Reveal } from '@/shared/ui'
import { MessageForm } from '@/features/send-message'
import { contactFormTitle } from '../model/content'

export const ContactFormSection = () => (
  <Reveal className="lg:col-start-1">
    <h2 className="h-display mt-4 text-[28px] text-night lg:text-[36px]">{contactFormTitle}</h2>
    <MessageForm className="mt-4 max-w-[420px]" />
  </Reveal>
)
