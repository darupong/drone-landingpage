import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { SeoHead } from '@/components/SeoHead'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <SeoHead path="/404" title={`${t('notFound.title')} — LuminaSky`} description={t('notFound.subtitle')} />
      <Navbar />
      <main id="main" className="grid min-h-[60svh] place-items-center px-6 py-24">
        <div className="text-center">
          <p className="text-section-title font-semibold tracking-tight text-[var(--color-primary)]">404</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t('notFound.title')}</h1>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-muted-foreground)] text-pretty">
            {t('notFound.subtitle')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
            >
              <Home size={16} aria-hidden="true" />
              {t('notFound.home')}
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 text-sm font-medium transition-colors hover:bg-[var(--color-accent)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('nav.portfolio')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
