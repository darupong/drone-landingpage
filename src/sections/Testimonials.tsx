import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { PortfolioThumbnail } from '@/components/PortfolioThumbnail'
import { PORTFOLIO } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TestimonialsProps {
  portfolioHref: string
}

/**
 * Repurposed: this section is now the "Portfolio Preview" on the home page.
 * The export name is kept as `Testimonials` so existing imports stay stable
 * (the brief allowed either approach).
 */
export function Testimonials({ portfolioHref }: TestimonialsProps) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const preview = PORTFOLIO.slice(0, 6)

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 },
    },
  }
  const childVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24, filter: reduced ? 'blur(0px)' : 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="portfolio-preview"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44"
    >
      <SectionBleed top color="primary" />
      <div className="container-page relative z-[1]">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-section-title font-semibold tracking-tight text-balance">
              {t('portfolio.previewTitle')}
            </h2>
            <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
              {t('portfolio.previewSubtitle')}
            </p>
          </div>
          <Link
            to={portfolioHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            {t('portfolio.viewAll')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <m.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={parentVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 3xl:gap-6 4xl:gap-7"
        >
          {preview.map((p, i) => (
            <m.li key={p.id} variants={childVariants}>
              <Link
                to={`${portfolioHref}#${p.id}`}
                className="group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-primary)]/40"
                aria-label={`${p.title} — ${t('portfolio.labels.viewProject')}`}
              >
                <div className="relative aspect-[4/3]">
                  <PortfolioThumbnail gradient={p.gradient} seed={(i + 1) * 13} />
                  <Badge className="absolute top-3 left-3 bg-black/40 text-white border-0 backdrop-blur-sm">
                    {t(`portfolio.filters.${p.category}`)}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    {p.client} · {p.year}
                  </p>
                </div>
              </Link>
            </m.li>
          ))}
        </m.ul>

        <div className="mt-10 text-center">
          <Link
            to={portfolioHref}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 h-11 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
          >
            {t('portfolio.viewAll')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <SectionBleed bottom color="secondary" />
    </section>
  )
}
