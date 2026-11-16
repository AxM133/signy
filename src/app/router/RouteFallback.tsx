import { Spinner } from '@/shared/ui'

/** Показывается, пока грузится ленивый чанк страницы при первом открытии. */
export const RouteFallback = () => (
  <div className="flex min-h-dvh items-center justify-center text-brand" role="status" aria-label="Загрузка">
    <Spinner className="size-10" />
  </div>
)
