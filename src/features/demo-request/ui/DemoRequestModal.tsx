import { EnvelopeIllustration, Modal } from '@/shared/ui'
import { DemoRequestForm } from './DemoRequestForm'

interface DemoRequestModalProps {
  open: boolean
  sent: boolean
  source?: string
  onSent: () => void
  onClose: () => void
}

export const DemoRequestModal = ({ open, sent, source, onSent, onClose }: DemoRequestModalProps) => (
  <Modal open={open} onClose={onClose} title="Демо версия">
    {sent ? (
      <div className="mt-4 flex flex-col items-center gap-8 pb-4">
        <p className="max-w-[330px] text-center text-[17px] leading-6 text-ink">
          Заявка отправленна и наши менеджеры свяжутся с тобой в ближайшее время
        </p>
        <EnvelopeIllustration />
      </div>
    ) : (
      <DemoRequestForm source={source} onSuccess={onSent} />
    )}
  </Modal>
)
