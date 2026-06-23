import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'

interface CtaProps {
  portfolioHref: string
}

export function Cta({ portfolioHref }: CtaProps) {
  const { t } = useTranslation()

  return (
    <section
      id="cta"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44"
    >
      <SectionBleed top color="amber" />
      <div className="container-page relative z-[1]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-amber-500 via-rose-500 to-rose-800 px-6 md:px-12 py-14 md:py-20 3xl:py-24 text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="text-section-title font-semibold tracking-tight text-balance">
                {t('cta.title')}
              </h2>
              <p className="mt-4 text-lead text-white/85 text-pretty">{t('cta.subtitle')}</p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href="mailto:hello@luminasky.show"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-slate-900 hover:bg-white/90 transition-colors"
                >
                  {t('cta.primary')}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <Link
                  to={portfolioHref}
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 text-base font-medium text-white backdrop-blur hover:bg-white/15 transition-colors"
                >
                  {t('cta.secondary')}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
