import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './shell/AppShell'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        async lazy() {
          const mod = await import('./features/home/HomePage')
          return { Component: mod.default }
        },
      },
      {
        path: 'producto',
        async lazy() {
          const mod = await import('./features/product/ProductPage')
          return { Component: mod.default }
        },
      },
      {
        path: 'contacto',
        async lazy() {
          const mod = await import('./features/contact/ContactPage')
          return { Component: mod.default }
        },
      },
    ],
  },
])
