import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { RootLayout } from '../layouts/RootLayout'
import { RouteError } from './RouteError'
import { RouteFallback } from './RouteFallback'

/** Страницы грузятся лениво — каждая в своём чанке. */
const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('@/pages/home')).HomePage }) },
      { path: 'about', lazy: async () => ({ Component: (await import('@/pages/about')).AboutPage }) },
      { path: 'blog', lazy: async () => ({ Component: (await import('@/pages/blog')).BlogPage }) },
      { path: 'blog/:slug', lazy: async () => ({ Component: (await import('@/pages/blog-post')).BlogPostPage }) },
      { path: 'faq', lazy: async () => ({ Component: (await import('@/pages/faq')).FaqPage }) },
      { path: 'video', lazy: async () => ({ Component: (await import('@/pages/video')).VideoPage }) },
      { path: 'contacts', lazy: async () => ({ Component: (await import('@/pages/contacts')).ContactsPage }) },
      { path: '*', lazy: async () => ({ Component: (await import('@/pages/not-found')).NotFoundPage }) },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
