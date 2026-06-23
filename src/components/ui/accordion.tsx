import { createContext, useContext, useId, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionContextValue {
  open: string | null
  setOpen: (id: string | null) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

interface AccordionProps {
  className?: string
  children: ReactNode
  defaultValue?: string | null
}

export function Accordion({ className, children, defaultValue = null }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultValue)
  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className={cn('divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  question: string
  children: ReactNode
}

export function AccordionItem({ value, question, children }: AccordionItemProps) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('AccordionItem must be inside Accordion')
  const id = useId()
  const isOpen = ctx.open === value
  const onToggle = () => ctx.setOpen(isOpen ? null : value)

  return (
    <div className="py-1">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base md:text-lg font-medium transition-colors hover:text-[var(--color-primary)]"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-[var(--color-muted-foreground)]"
            aria-hidden="true"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            id={`${id}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden text-[var(--color-muted-foreground)]"
          >
            <div className="pb-5 pr-8 leading-relaxed">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
