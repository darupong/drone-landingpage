import { useTranslation } from 'react-i18next'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { SeoHead } from '@/components/SeoHead'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { useAppStore } from '@/store/useAppStore'
import { getPageContent } from '@/data/pages'

interface ContentPageProps {
  slug: string
}

export default function ContentPage({ slug }: ContentPageProps) {
  const { t } = useTranslation()
  // Language comes from the store; content falls back to Thai when a locale is missing.
  const locale = useAppStore((s) => s.locale)
  const page = getPageContent(slug, locale)
  if (!page) return null

  return (
    <>
      <SeoHead path={`/${slug}`} title={`${page.title} — LuminaSky`} description={page.description} />
      <Navbar />
      <main id="main">
        <section className="relative pt-16 pb-8 sm:pt-20 md:pt-28 overflow-hidden">
          <SectionBleed bottom color="amber" />
          <div className="container-page max-w-3xl">
            <Reveal>
              <h1 className="text-section-title font-semibold tracking-tight text-balance">{page.title}</h1>
              <p className="mt-5 text-lead text-[var(--color-muted-foreground)] text-pretty">{page.description}</p>
              {page.updated ? (
                <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                  {t('content.lastUpdated')}: {page.updated}
                </p>
              ) : null}
            </Reveal>
          </div>
        </section>

        <section className="relative pb-20 3xl:pb-28">
          <div className="container-page max-w-3xl space-y-10">
            {page.sections.map((s, i) => (
              <Reveal key={i}>
                <div>
                  {s.heading ? <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2> : null}
                  {s.paragraphs?.map((p, j) => (
                    <p key={j} className="mt-3 leading-relaxed text-[var(--color-muted-foreground)] text-pretty">
                      {p}
                    </p>
                  ))}
                  {s.list ? (
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item, j) => (
                        <li key={j} className="flex gap-2.5 text-[var(--color-muted-foreground)]">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
