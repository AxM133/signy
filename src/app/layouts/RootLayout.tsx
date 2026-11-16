import { Outlet } from 'react-router'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { useScrollManager } from './useScrollManager'

export const RootLayout = () => {
  useScrollManager()
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only z-[200] rounded-full bg-brand px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        К содержимому
      </a>
      <Header />
      <main id="content" className="flex-1 pt-16 outline-none lg:pt-20" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
