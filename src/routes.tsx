import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import ContentPage from './pages/ContentPage'
import NotFound from './pages/NotFound'
import { CONTENT_SLUGS } from './data/pages'

// Language lives in the app store (zustand), not the URL — so there is exactly
// one path per page. Company + legal pages sit at bare paths (e.g. /about, /terms).
const contentRoutes: RouteRecord[] = CONTENT_SLUGS.map((slug) => ({
  path: slug,
  element: <ContentPage slug={slug} />,
  entry: 'src/pages/ContentPage.tsx',
}))

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.tsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.tsx' },
      { path: 'portfolio', element: <Portfolio />, entry: 'src/pages/Portfolio.tsx' },
      ...contentRoutes,
      { path: '*', element: <NotFound /> },
    ],
  },
]
