import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { m, useScroll, useTransform } from 'motion/react'
import { MapPin, Users, Clock, Plane } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Starfield } from '@/components/Starfield'
import { SectionBleed } from '@/components/SectionBleed'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type CaptionKey = 'wide' | 'close' | 'audience' | 'team'

const KEYS: CaptionKey[] = ['wide', 'close', 'audience', 'team']

const GRADIENTS: Record<CaptionKey, string> = {
  wide: 'from-rose-700 via-rose-950 to-stone-950',
  close: 'from-amber-500 via-rose-900 to-stone-950',
  audience: 'from-rose-800 via-stone-900 to-stone-950',
  team: 'from-amber-700 via-rose-900 to-stone-950',
}

type StatKey = 'drones' | 'shows' | 'audience' | 'safety'
const STAT_KEYS: StatKey[] = ['drones', 'shows', 'audience', 'safety']

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? target : 0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let started = false
    const start = (time: number) => {
      const duration = 1400
      const step = (now: number) => {
        const p = Math.min(1, (now - time) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(Math.floor(eased * target))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true
            start(performance.now())
          }
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, reduced])

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

// Numeric parts for count-up (mapped from i18n values like "500+", "100%")
const TARGETS: Record<StatKey, { target: number; suffix: string }> = {
  drones: { target: 500, suffix: '+' },
  shows: { target: 80, suffix: '+' },
  audience: { target: 50, suffix: 'K+' },
  safety: { target: 100, suffix: '%' },
}

export function Showcase() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBack = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])
  const yFront = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['8%', '-8%'])

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-28 3xl:py-36 4xl:py-44 overflow-hidden"
    >
      <SectionBleed top color="muted" />
      <Starfield className="absolute inset-0 -z-10 w-full h-full opacity-50 pointer-events-none" count={70} seed={101} />
      <div className="container-page relative z-[1]">
        <Reveal className="max-w-2xl mb-10">
          <h2 className="text-section-title font-semibold tracking-tight text-balance">
            {t('showcase.title')}
          </h2>
          <p className="mt-4 text-lead text-[var(--color-muted-foreground)] text-pretty">
            {t('showcase.subtitle')}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <m.figure
            style={{ y: yBack }}
            className="lg:col-span-8 group relative overflow-hidden rounded-2xl border border-[var(--color-border)] aspect-[4/3]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS.wide} transition-transform duration-700 group-hover:scale-105`} />
            <Starfield className="absolute inset-0 w-full h-full opacity-90" count={120} seed={9} />
            <img
              src="/hero-droneshow.svg"
              alt={t('showcase.project.imageAlt')}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="relative h-full w-full object-contain p-12 opacity-90"
            />
            <figcaption className="absolute bottom-4 left-5 text-sm font-medium text-white/80">
              {t(`showcase.captions.${KEYS[0]}`)}
            </figcaption>
          </m.figure>

          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <m.figure
              style={{ y: yFront }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] aspect-[4/3]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS.close} transition-transform duration-700 group-hover:scale-105`} />
              <Starfield className="absolute inset-0 w-full h-full opacity-80" count={50} seed={11} />
              <figcaption className="absolute bottom-4 left-5 text-sm font-medium text-white/80">
                {t(`showcase.captions.${KEYS[1]}`)}
              </figcaption>
            </m.figure>

            <m.figure
              style={{ y: yBack }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] aspect-[4/3]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS.audience} transition-transform duration-700 group-hover:scale-105`} />
              <Starfield className="absolute inset-0 w-full h-full opacity-80" count={50} seed={17} />
              <figcaption className="absolute bottom-4 left-5 text-sm font-medium text-white/80">
                {t(`showcase.captions.${KEYS[2]}`)}
              </figcaption>
            </m.figure>
          </div>
        </div>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8">
            <div className="grid md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {t('showcase.project.name')}
                </h3>
                <p className="mt-2 text-[var(--color-muted-foreground)]">
                  <span className="font-medium text-[var(--color-foreground)]">{t('showcase.project.client')}</span>
                  <span className="mx-2">·</span>
                  <span>{t('showcase.project.result')}</span>
                </p>
              </div>
              <dl className="md:col-span-5 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Plane size={16} aria-hidden="true" className="mt-0.5 text-[var(--color-primary)]" />
                  <div>
                    <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.drones')}</dt>
                    <dd className="font-semibold">{t('showcase.project.drones')}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={16} aria-hidden="true" className="mt-0.5 text-[var(--color-primary)]" />
                  <div>
                    <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.duration')}</dt>
                    <dd className="font-semibold">{t('showcase.project.duration')}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} aria-hidden="true" className="mt-0.5 text-[var(--color-primary)]" />
                  <div>
                    <dt className="text-[var(--color-muted-foreground)]">{t('portfolio.labels.location')}</dt>
                    <dd className="font-semibold">{t('showcase.project.location')}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users size={16} aria-hidden="true" className="mt-0.5 text-[var(--color-primary)]" />
                  <div>
                    <dt className="text-[var(--color-muted-foreground)]">Audience</dt>
                    <dd className="font-semibold">{t('showcase.project.audience')}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 3xl:gap-8">
            {STAT_KEYS.map((key) => (
              <div key={key} className="text-center md:text-left">
                <div className="text-4xl md:text-5xl 3xl:text-6xl font-semibold tracking-tight text-[var(--color-primary)]">
                  <CountUp target={TARGETS[key].target} suffix={TARGETS[key].suffix} />
                </div>
                <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  {t(`stats.items.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <SectionBleed bottom color="primary" />
    </section>
  )
}
