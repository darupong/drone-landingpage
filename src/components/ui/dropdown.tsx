import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  /** Content rendered inside the trigger button. */
  triggerContent: ReactNode
  triggerClassName?: string
  triggerAriaLabel?: string
  align?: 'start' | 'end'
  menuClassName?: string
  /** Render-prop receiving a `close` callback to dismiss the menu after an action. */
  children: (close: () => void) => ReactNode
}

export function DropdownMenu({
  triggerContent,
  triggerClassName,
  triggerAriaLabel,
  align = 'end',
  menuClassName,
  children,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerAriaLabel}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
          triggerClassName,
        )}
      >
        {triggerContent}
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute top-[calc(100%+0.5rem)] z-50 min-w-[10rem] origin-top rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/95 p-1.5 shadow-xl backdrop-blur-xl',
              align === 'end' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
              menuClassName,
            )}
          >
            {children(() => setOpen(false))}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  /** When true (and `active`), shows a trailing check icon. */
  showCheck?: boolean
}

export function DropdownItem({ active, showCheck = true, className, children, ...props }: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
        active
          ? 'bg-[var(--color-accent)] text-[var(--color-foreground)]'
          : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]',
        className,
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2.5">{children}</span>
      {showCheck && active ? <Check size={15} aria-hidden="true" className="text-[var(--color-primary)]" /> : null}
    </button>
  )
}
