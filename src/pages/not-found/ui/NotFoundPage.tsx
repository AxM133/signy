import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { SceneSection } from '../sections/scene'

export const NotFoundPage = () => {
  useDocumentTitle('404 — страница не найдена — Signy')
  return <SceneSection />
}
