import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { useAppStore, type Locale } from '@/store/useAppStore'
import { SUPPORTED_LOCALES } from '@/i18n'
import { DropdownMenu, DropdownItem } from '@/components/ui/dropdown'
import { cn } from '@/lib/utils'

const LABELS: Record<Locale, string> = { en: 'EN', th: 'TH', zh: 'ZH' }
const NATIVE: Record<Locale, string> = { en: 'English', th: 'ไทย', zh: '中文' }
const FLAGS: Record<Locale, string> = { en: '/icons/en.png', th: '/icons/th.png', zh: '/icons/zh.png' }

function Flag({ locale, size = 18 }: { locale: Locale; size?: number }) {
  return (
    <img
      src={FLAGS[locale]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="inline-block shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  )
}

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
            <Flag locale={currentLocale} size={18} />
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
              <Flag locale={loc} size={18} />
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
              'flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              currentLocale === loc
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                : 'border-[var(--color-border)] hover:bg-[var(--color-accent)]',
            )}
          >
            <Flag locale={loc} size={18} />
            {NATIVE[loc]}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-1', className)} role="group" aria-label={t('nav.language')}>
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={currentLocale === loc}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
            currentLocale === loc
              ? 'text-[var(--color-foreground)]'
              : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]',
          )}
        >
          <Flag locale={loc} size={16} />
          {LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
