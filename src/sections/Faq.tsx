import { useTranslation } from 'react-i18next'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'

interface FaqItem {
  q: string
  a: string
}

export function Faq() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44 bg-[var(--color-muted)]/40"
    >
      <SectionBleed top color="muted" />
      <div className="container-page max-w-3xl relative z-[1]">
        <Reveal>
          <h2 className="text-section-title font-semibold tracking-tight text-balance">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
            {t('faq.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <Accordion>
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} question={item.q}>
                {item.a}
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
      <SectionBleed bottom color="amber" />
    </section>
  )
}
