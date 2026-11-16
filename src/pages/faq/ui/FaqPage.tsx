import { PageHead } from '@/shared/ui'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { AskSection } from '../sections/ask'
import { GroupsSection } from '../sections/groups'

export const FaqPage = () => {
  useDocumentTitle('Популярные вопросы — Signy')
  return (
    <>
      <PageHead crumbs={[{ label: 'Популярные вопросы' }]} title="Популярные вопросы и ответы на них" />
      <GroupsSection />
      <AskSection />
    </>
  )
}
