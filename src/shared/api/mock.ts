/**
 * Бэкенда у проекта нет — все «запросы» идут в мок с имитацией сети.
 * Когда появится реальный API, меняется только содержимое функций в папках `api`
 * сущностей и фич, а UI и react-query остаются прежними.
 */
export const simulateLatency = <T>(data: T, ms = 450): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

export class ApiError extends Error {
  status: number
  constructor(message: string, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
