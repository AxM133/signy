import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

/**
 * Заголовки безопасности хранятся в одном месте — vercel.json.
 * Здесь они же подключаются к `npm run preview`, чтобы CSP можно было проверить локально
 * до деплоя. `upgrade-insecure-requests` для http://localhost убираем (иначе ресурсы не загрузятся).
 */
const securityHeaders = (): Record<string, string> => {
  const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf-8'))
  const all = config.headers.find((h: { source: string }) => h.source === '/(.*)')?.headers ?? []
  const headers: Record<string, string> = {}
  for (const { key, value } of all as { key: string; value: string }[]) {
    if (key === 'Strict-Transport-Security') continue
    headers[key] = key === 'Content-Security-Policy' ? value.replace(/;?\s*upgrade-insecure-requests/, '') : value
  }
  return headers
}

// https://vite.dev/config/
export default defineConfig({
  preview: { headers: securityHeaders() },
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Тяжёлые библиотеки — в отдельные чанки: лучше кэшируются между деплоями
        codeSplitting: {
          groups: [
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/, priority: 30 },
            { name: 'forms', test: /node_modules[\\/](zod|react-hook-form|@hookform)[\\/]/, priority: 20 },
            { name: 'query', test: /node_modules[\\/]@tanstack[\\/]/, priority: 20 },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
