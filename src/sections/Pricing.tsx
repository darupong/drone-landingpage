import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type TierKey = 'essential' | 'signature' | 'cinematic'

const TIERS: { key: TierKey; popular?: boolean }[] = [
  { key: 'essential' },
  { key: 'signature', popular: true },
  { key: 'cinematic' },
]

export function Pricing() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

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
      id="pricing"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44"
    >
      <SectionBleed top color="secondary" />
      <div className="container-page relative z-[1]">
        <Reveal className="max-w-2xl mb-10 lg:mb-12">
          <h2 className="text-section-title font-semibold tracking-tight text-balance">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
            {t('pricing.subtitle')}
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={parentVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-8 items-stretch"
        >
          {TIERS.map(({ key, popular }) => {
            const features = t(`pricing.tiers.${key}.features`, { returnObjects: true }) as string[]
            return (
              <motion.div key={key} variants={childVariants} className="h-full">
                <Card
                  className={cn(
                    'relative h-full flex flex-col transition-all duration-300 hover:-translate-y-1',
                    popular
                      ? 'border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]/30'
                      : '',
                  )}
                >
                  {popular ? (
                    <Badge className="absolute -top-3 left-6">{t('pricing.mostPopular')}</Badge>
                  ) : null}
                  <CardHeader>
                    <div className="text-lg font-semibold tracking-tight">
                      {t(`pricing.tiers.${key}.name`)}
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl 3xl:text-5xl font-semibold tracking-tight">
                        {t(`pricing.tiers.${key}.price`)}
                      </span>
                      <span className="text-sm text-[var(--color-muted-foreground)]">
                        / {t('pricing.perOne')}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                      {t(`pricing.tiers.${key}.summary`)}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="space-y-3 flex-1">
                      {features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#cta"
                      className={cn(
                        'mt-7 inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-sm font-semibold transition-opacity',
                        popular
                          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90'
                          : 'border border-[var(--color-border)] hover:bg-[var(--color-accent)]',
                      )}
                    >
                      {t('pricing.cta')}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <SectionBleed bottom color="violet" />
    </section>
  )
}
