import { PageHead } from '@/shared/ui'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { ContactFormSection } from '../sections/form'
import { InfoSection } from '../sections/info'

export const ContactsPage = () => {
  useDocumentTitle('Контакты — Signy')
  return (
    <>
      <PageHead crumbs={[{ label: 'Контакты' }]} title="Наши контакты" />
      <div className="container-page grid gap-x-[26px] gap-y-6 pt-5 pb-14 lg:grid-cols-2 lg:gap-x-[26px] lg:pb-16">
        <InfoSection />
        <ContactFormSection />
      </div>
    </>
  )
}
