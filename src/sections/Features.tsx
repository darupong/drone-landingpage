import { useTranslation } from 'react-i18next'
import { m } from 'motion/react'
import { Heart, Music, Building2, Megaphone, Sparkles, Hourglass } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ICONS = {
  wedding: Heart,
  concert: Music,
  corporate: Building2,
  activation: Megaphone,
  opening: Sparkles,
  countdown: Hourglass,
} as const

type ServiceKey = keyof typeof ICONS

const KEYS: ServiceKey[] = ['wedding', 'concert', 'corporate', 'activation', 'opening', 'countdown']

// Exporting as `Features` so existing imports continue to work; the file still
// renders the new "Services" section described in the brief.
export function Features() {
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
      id="services"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44"
    >
      <SectionBleed top color="amber" />
      <div className="container-page relative z-[1]">
        <Reveal className="max-w-2xl">
          <h2 className="text-section-title font-semibold tracking-tight text-balance">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
            {t('services.subtitle')}
          </p>
        </Reveal>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={parentVariants}
          className="mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 3xl:gap-6 4xl:gap-7"
        >
          {KEYS.map((key) => {
            const Icon = ICONS[key]
            return (
              <m.div key={key} variants={childVariants}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-primary)]/40">
                  <CardContent className="p-6 3xl:p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {t(`services.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                      {t(`services.items.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </m.div>
            )
          })}
        </m.div>
      </div>
      <SectionBleed bottom color="violet" />
    </section>
  )
}
