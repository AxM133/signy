import { EnvelopeIllustration, Modal } from '@/shared/ui'

export const MessageSentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Modal open={open} onClose={onClose} title="Спасибо">
    <div className="mt-4 flex flex-col items-center gap-8 pb-4">
      <p className="max-w-[330px] text-center text-[17px] leading-6 text-ink">
        Твое сообщение отправленно! Наши менеджеры свяжутся с тобой в ближайшее время
      </p>
      <EnvelopeIllustration />
    </div>
  </Modal>
)
