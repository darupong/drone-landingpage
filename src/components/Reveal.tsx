import { type ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
  once?: boolean
}

const buildVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

export function Reveal({ children, delay = 0, y = 24, className, as = 'div', once = true }: RevealProps) {
  const reduced = useReducedMotion()
  const variants = buildVariants(reduced ? 0 : y)

  const MotionTag = motion[as] as typeof motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-100px' }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
