import { useEffect, useState } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, next)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
