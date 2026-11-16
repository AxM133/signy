import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { PageTitle } from './SectionTitle'
import { Reveal } from './Reveal'

interface PageHeadProps {
  crumbs: Crumb[]
  title: ReactNode
  children?: ReactNode
}

/** Хлебные крошки + H1 — одинаковая «шапка» внутренних страниц. */
export const PageHead = ({ crumbs, title, children }: PageHeadProps) => (
  <div className="container-page pt-5 lg:pt-6">
    <Breadcrumbs items={crumbs} />
    <Reveal y={16}>
      <PageTitle className="mt-4 lg:mt-5">{title}</PageTitle>
      {children}
    </Reveal>
  </div>
)
