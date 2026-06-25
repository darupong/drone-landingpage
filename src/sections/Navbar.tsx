import { m, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAppStore } from '@/store/useAppStore'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const open = useAppStore((s) => s.mobileMenuOpen)
  const setOpen = useAppStore((s) => s.setMobileMenuOpen)
  const scrolled = useScrolledPast(16)

  const quoteHref = '/#cta'

  // Language lives in the store (no locale in the URL), so links are bare paths.
  // Section anchors live on the home page — routing to "/#x" scrolls there.
  const links: { to: string; label: string }[] = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/#process', label: t('nav.process') },
    { to: '/#pricing', label: t('nav.pricing') },
    { to: '/#faq', label: t('nav.faq') },
    { to: quoteHref, label: t('nav.contact') },
  ]

  return (
    <m.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30"
    >
      <div
        className={cn(
          'border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out',
          scrolled
            ? 'bg-[var(--color-background)]/70 border-[var(--color-border)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]'
            : 'bg-transparent border-transparent shadow-none',
        )}
      >
        <m.div
          animate={{ height: scrolled ? 56 : 72 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="container-page flex items-center justify-between gap-4"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 font-semibold tracking-tight text-lg"
          >
            <m.span
              aria-hidden="true"
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
              className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-amber-400 to-rose-400 shadow-[0_0_18px_-2px_rgba(251,191,36,0.6)]"
            />
            <span className="transition-colors group-hover:text-[var(--color-primary)]">{t('site.name')}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 text-sm">
            {links.map((l) => {
              const className =
                'group relative px-3 py-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors'
              const underline = (
                <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-amber-400 to-rose-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              )
              return (
                <Link key={l.to} to={l.to} className={className}>
                  {l.label}
                  {underline}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitcher variant="menu" className="hidden md:inline-flex" />
            <ThemeToggle />
            <Link
              to={quoteHref}
              className="group hidden md:inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary)] pl-4 pr-3.5 text-sm font-medium text-[var(--color-primary-foreground)] shadow-[0_4px_20px_-6px_var(--color-primary)] transition-[transform,opacity] duration-200 hover:opacity-95 hover:scale-[1.03] active:scale-95"
            >
              {t('nav.quote')}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={open ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </m.span>
              </AnimatePresence>
            </Button>
          </div>
        </m.div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} ariaLabel={t('nav.openMenu')}>
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold tracking-tight text-lg">{t('site.name')}</span>
            <Button variant="ghost" size="icon" aria-label={t('nav.closeMenu')} onClick={() => setOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l, i) => {
              const inner = (
                <m.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {l.label}
                </m.span>
              )
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium hover:bg-[var(--color-accent)]"
                >
                  {inner}
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto space-y-4 pt-6 border-t border-[var(--color-border)]">
            <LanguageSwitcher variant="full" />
            <Link
              to={quoteHref}
              onClick={() => setOpen(false)}
              className="flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-primary-foreground)] hover:opacity-90 transition-opacity"
            >
              {t('nav.quote')}
            </Link>
          </div>
        </div>
      </Sheet>
    </m.header>
  )
}
