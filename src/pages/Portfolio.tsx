import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { m } from 'motion/react'
import { MapPin, Clock, Plane, Users, Calendar } from 'lucide-react'
import { Navbar } from '@/sections/Navbar'
import { Cta } from '@/sections/Cta'
import { Footer } from '@/sections/Footer'
import { SeoHead } from '@/components/SeoHead'
import { Dialog } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { PortfolioThumbnail } from '@/components/PortfolioThumbnail'
import { PORTFOLIO, type PortfolioCategory, type PortfolioProject } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const FILTERS: Array<{ key: 'all' | PortfolioCategory }> = [
  { key: 'all' },
  { key: 'wedding' },
  { key: 'corporate' },
  { key: 'festival' },
  { key: 'brand' },
]

export default function Portfolio() {
  const { t } = useTranslation()
  const location = useLocation()
  const [filter, setFilter] = useState<'all' | PortfolioCategory>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  // Open the matching project dialog when the URL hash matches a project id.
  // This synchronises dialog state to an external system (the router) and must
  // run post-hydration to deep-link correctly, so the setState-in-effect is
  // intentional here rather than a derived-state smell.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = location.hash.replace(/^#/, '')
    if (!hash) return
    const exists = PORTFOLIO.some((p) => p.id === hash)
    if (exists) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to the URL hash
      setOpenId(hash)
      // Try to scroll to the card so the dialog opens near its origin.
      const el = document.getElementById(`portfolio-card-${hash}`)
      if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'auto' })
      }
    }
  }, [location.hash])

  const portfolioHref = '/portfolio'

  const filtered = useMemo<PortfolioProject[]>(
    () => (filter === 'all' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  )

  const openProject = filtered.find((p) => p.id === openId) ?? PORTFOLIO.find((p) => p.id === openId) ?? null

  const closeDialog = () => {
    setOpenId(null)
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '', portfolioHref || '/portfolio')
    }
  }

  return (
    <>
      <SeoHead path="/portfolio" jsonLdType="portfolio" titleKey="seo.portfolio" />
      <Navbar />
      <main id="main">
        <section className="relative pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-28 md:pb-16 3xl:pt-36 4xl:pt-44 overflow-hidden">
          <SectionBleed bottom color="amber" />
          <div className="container-page max-w-4xl">
            <Reveal>
              <Badge variant="outline" className="mb-5 backdrop-blur-sm bg-[var(--color-background)]/60">
                {t('portfolio.seo.title')}
              </Badge>
              <h1 className="text-display font-semibold tracking-tight text-balance">
                {t('portfolio.pageTitle')}
              </h1>
              <p className="mt-5 max-w-2xl text-lead text-[var(--color-muted-foreground)] text-pretty">
                {t('portfolio.pageIntro')}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 sm:py-12 md:py-16 3xl:py-20 4xl:py-24">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter">
              {FILTERS.map(({ key }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={filter === key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
                    filter === key
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'border-[var(--color-border)] hover:bg-[var(--color-accent)]',
                  )}
                >
                  {t(`portfolio.filters.${key}`)}
                </button>
              ))}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5 3xl:gap-6 4xl:gap-7 auto-rows-[16rem] md:auto-rows-[18rem] 3xl:auto-rows-[20rem]">
              {filtered.map((p, i) => (
                <m.li
                  key={p.id}
                  id={`portfolio-card-${p.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.05 }}
                  className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(p.id)}
                    className="absolute inset-0 text-left group"
                    aria-label={`${p.title} — ${t('portfolio.labels.viewProject')}`}
                  >
                    <PortfolioThumbnail gradient={p.gradient} seed={(i + 1) * 7} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                      <Badge className="mb-2 bg-white/20 text-white border-0 backdrop-blur-sm">
                        {t(`portfolio.filters.${p.category}`)}
                      </Badge>
                      <div className="font-semibold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-white/70 mt-1">
                        {p.client} · {p.year}
                      </div>
                    </div>
                  </button>
                </m.li>
              ))}
            </ul>
          </div>
        </section>

        <Cta portfolioHref={portfolioHref} />
      </main>
      <Footer />

      <Dialog
        open={openProject !== null}
        onClose={closeDialog}
        title={openProject?.title}
        className="max-w-2xl"
      >
        {openProject ? (
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg -mt-1">
              <PortfolioThumbnail gradient={openProject.gradient} seed={openProject.id.length * 11} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-0">
                {t(`portfolio.filters.${openProject.category}`)}
              </Badge>
              <span className="text-[var(--color-muted-foreground)]">{openProject.client}</span>
            </div>
            <p className="mt-4 text-[var(--color-muted-foreground)] text-pretty">
              {openProject.description}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-2">
                <Plane size={16} aria-hidden="true" className="row-span-2 mt-0.5 text-[var(--color-primary)]" />
                <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.drones')}</dt>
                <dd className="font-semibold">{openProject.drones}</dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-2">
                <Clock size={16} aria-hidden="true" className="row-span-2 mt-0.5 text-[var(--color-primary)]" />
                <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.duration')}</dt>
                <dd className="font-semibold">{openProject.duration}</dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-2">
                <MapPin size={16} aria-hidden="true" className="row-span-2 mt-0.5 text-[var(--color-primary)]" />
                <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.location')}</dt>
                <dd className="font-semibold">{openProject.location}</dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-2">
                <Calendar size={16} aria-hidden="true" className="row-span-2 mt-0.5 text-[var(--color-primary)]" />
                <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.year')}</dt>
                <dd className="font-semibold">{openProject.year}</dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-2 col-span-2">
                <Users size={16} aria-hidden="true" className="row-span-2 mt-0.5 text-[var(--color-primary)]" />
                <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.services')}</dt>
                <dd className="font-semibold">{openProject.services}</dd>
              </div>
            </dl>
            <p className="mt-5 rounded-lg bg-[var(--color-muted)]/60 p-4 text-sm">
              <span className="font-semibold">{t('portfolio.labels.result')}: </span>
              {openProject.result}
            </p>
          </div>
        ) : null}
      </Dialog>
    </>
  )
}
