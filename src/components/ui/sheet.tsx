import { useEffect, type ReactNode } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open: boolean
  onClose: () => void
  side?: 'right' | 'left'
  className?: string
  children: ReactNode
  ariaLabel?: string
}

export function Sheet({ open, onClose, side = 'right', className, children, ariaLabel }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <m.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'fixed top-0 z-50 h-dvh w-[88%] max-w-sm bg-[var(--color-background)] shadow-2xl',
              side === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            {children}
          </m.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
