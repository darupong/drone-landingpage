import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ClipboardList, PenTool, Map, PartyPopper } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionBleed } from '@/components/SectionBleed'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ICONS = {
  brief: ClipboardList,
  design: PenTool,
  rehearsal: Map,
  show: PartyPopper,
} as const

type StepKey = keyof typeof ICONS

const KEYS: StepKey[] = ['brief', 'design', 'rehearsal', 'show']

export function Process() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.05 },
    },
  }
  const stepVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="process"
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44 bg-[var(--color-muted)]/40"
    >
      <SectionBleed top color="violet" />
      <div className="container-page relative z-[1]">
        <Reveal className="max-w-2xl mb-10 lg:mb-12">
          <h2 className="text-section-title font-semibold tracking-tight text-balance">
            {t('process.title')}
          </h2>
          <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
            {t('process.subtitle')}
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={parentVariants}
          className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-6 3xl:gap-8"
        >
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent"
          />
          {KEYS.map((key, i) => {
            const Icon = ICONS[key]
            return (
              <motion.div key={key} variants={stepVariants} className="relative">
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary)] shadow-sm">
                  <Icon size={22} aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-[var(--color-primary-foreground)]"
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {t(`process.steps.${key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <SectionBleed bottom color="muted" />
    </section>
  )
}
