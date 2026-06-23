import { useTranslation } from 'react-i18next'
import { ChevronDown, Globe } from 'lucide-react'
import { useAppStore, type Locale } from '@/store/useAppStore'
import { SUPPORTED_LOCALES } from '@/i18n'
import { DropdownMenu, DropdownItem } from '@/components/ui/dropdown'
import { cn } from '@/lib/utils'

const LABELS: Record<Locale, string> = { en: 'EN', th: 'TH', zh: 'ZH' }
const NATIVE: Record<Locale, string> = { en: 'English', th: 'ไทย', zh: '中文' }

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full' | 'menu'
  className?: string
}

export function LanguageSwitcher({ variant = 'compact', className }: LanguageSwitcherProps) {
  const { t } = useTranslation()
  const currentLocale = useAppStore((s) => s.locale)
  const setLocale = useAppStore((s) => s.setLocale)

  // Language is stored client-side (no URL change) — App syncs i18n to it.
  const switchTo = (next: Locale) => setLocale(next)

  if (variant === 'menu') {
    return (
      <DropdownMenu
        align="end"
        triggerAriaLabel={t('nav.language')}
        triggerClassName={cn(
          'h-9 px-3 text-sm font-medium text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]',
          className,
        )}
        triggerContent={
          <>
            <Globe size={16} aria-hidden="true" />
            <span className="tabular-nums">{LABELS[currentLocale]}</span>
            <ChevronDown size={14} aria-hidden="true" className="opacity-70" />
          </>
        }
      >
        {(close) =>
          SUPPORTED_LOCALES.map((loc) => (
            <DropdownItem
              key={loc}
              active={currentLocale === loc}
              onClick={() => {
                switchTo(loc)
                close()
              }}
            >
              <span className="text-xs font-semibold uppercase tabular-nums text-[var(--color-muted-foreground)]">
                {LABELS[loc]}
              </span>
              {NATIVE[loc]}
            </DropdownItem>
          ))
        }
      </DropdownMenu>
    )
  }

  if (variant === 'full') {
    return (
      <div className={cn('flex items-center gap-2', className)} role="group" aria-label={t('nav.language')}>
        {SUPPORTED_LOCALES.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={currentLocale === loc}
            className={cn(
              'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              currentLocale === loc
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                : 'border-[var(--color-border)] hover:bg-[var(--color-accent)]',
            )}
          >
            {NATIVE[loc]}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)} role="group" aria-label={t('nav.language')}>
      <span className="mr-1.5 text-[var(--color-muted-foreground)]" aria-hidden="true">
        <Globe size={16} />
      </span>
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={currentLocale === loc}
          className={cn(
            'px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
            currentLocale === loc
              ? 'text-[var(--color-foreground)]'
              : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]',
          )}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
