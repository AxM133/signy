import { paths } from '@/shared/config/routes'
import { Button } from '@/shared/ui'

export const RouteError = () => {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <h1 className="h-display text-[32px] text-night">Что-то пошло не так</h1>
      <p className="max-w-md text-[17px] text-muted">Страница не загрузилась. Попробуйте обновить её или вернуться на главную.</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Обновить
        </Button>
        <Button to={paths.home}>На главную</Button>
      </div>
    </div>
  )
}
