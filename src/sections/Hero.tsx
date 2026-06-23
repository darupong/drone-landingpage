import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Award, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HeroProps {
  portfolioHref: string
}

export function Hero({ portfolioHref }: HeroProps) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  const title = t('hero.title')

  const trustItems = [
    { icon: Sparkles, key: 'rating', label: t('hero.trust.rating') },
    { icon: Award, key: 'clients', label: t('hero.trust.clients') },
    { icon: ShieldCheck, key: 'safety', label: t('hero.trust.safety') },
    { icon: Users, key: 'experience', label: t('hero.trust.experience') },
  ]

  // Gentle entrance only — the background image itself is fully static.
  const fadeUp = (delay: number) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden"
    >
      {/* Full-bleed background image — static, no parallax or motion */}
      <picture className="absolute inset-0 -z-20">
        <source
          type="image/webp"
          sizes="100vw"
          srcSet="/images/aerial-site-640.webp 640w, /images/aerial-site-960.webp 960w, /images/aerial-site-1280.webp 1280w, /images/aerial-site-1600.webp 1600w, /images/aerial-site-1920.webp 1920w"
        />
        <img
          src="/images/aerial-site-1280.jpg"
          alt={t('hero.imageAlt')}
          width={1920}
          height={1104}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>

      {/* Legibility overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/55 to-black/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
      />

      <div className="container-page py-24 sm:py-28 md:py-32">
        <div className="max-w-2xl 3xl:max-w-3xl text-white">
          <motion.div {...fadeUp(0)}>
            <Badge
              variant="outline"
              className="mb-5 border-white/35 bg-white/10 text-white backdrop-blur-sm"
            >
              {t('hero.eyebrow')}
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-display font-semibold tracking-tight text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          >
            {title.split('\n').map((line, li) => (
              <span key={li} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-lead text-white/85 text-pretty"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
          >
            <a
              href="#cta"
              className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-7 text-base font-medium text-[var(--color-primary-foreground)] shadow-lg transition-opacity hover:opacity-95"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={portfolioHref}
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              {t('hero.ctaSecondary')}
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(0.32)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85"
          >
            {trustItems.map(({ icon: Icon, key, label }) => (
              <li key={key} className="flex items-center gap-2">
                <Icon size={16} aria-hidden="true" className="text-[var(--color-primary)]" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
