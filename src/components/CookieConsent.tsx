import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'

export function CookieConsent() {
  const consent = useAppStore((s) => s.cookieConsent)
  const setConsent = useAppStore((s) => s.setCookieConsent)
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  // Only render after mount so the stored choice is read client-side and the
  // banner never appears in the prerendered HTML (avoids hydration mismatch).
  useEffect(() => setMounted(true), [])

  const show = mounted && consent === null

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          role="dialog"
          aria-label={t('cookie.aria')}
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
        >
          <div className="container-page">
            <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/95 p-4 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-4 sm:p-5">
              <div className="flex flex-1 items-start gap-3">
                <Cookie size={20} aria-hidden="true" className="mt-0.5 flex-none text-[var(--color-primary)]" />
                <p className="text-sm text-[var(--color-muted-foreground)] text-pretty">
                  {t('cookie.message')}{' '}
                  <Link to="/cookies" className="font-medium text-[var(--color-foreground)] underline underline-offset-4 hover:text-[var(--color-primary)]">
                    {t('cookie.policyLink')}
                  </Link>
                </p>
              </div>
              <div className="flex flex-none gap-2.5">
                <button
                  type="button"
                  onClick={() => setConsent('declined')}
                  className="h-10 rounded-full border border-[var(--color-border)] px-5 text-sm font-medium transition-colors hover:bg-[var(--color-accent)]"
                >
                  {t('cookie.decline')}
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('accepted')}
                  className="h-10 rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
                >
                  {t('cookie.accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
