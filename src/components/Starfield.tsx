import { useMemo } from 'react'

interface StarfieldProps {
  count?: number
  className?: string
  seed?: number
}

interface Star {
  cx: number
  cy: number
  r: number
  delay: number
  duration: number
  color: 'amber' | 'violet' | 'white'
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const COLORS: Record<Star['color'], string> = {
  amber: '#f3e3c3',
  violet: '#f7d9e0',
  white: '#ffffff',
}

export function Starfield({ count = 80, className, seed = 7 }: StarfieldProps) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(seed)
    const out: Star[] = []
    for (let i = 0; i < count; i += 1) {
      const palette: Star['color'] = i % 5 === 0 ? 'amber' : i % 7 === 0 ? 'violet' : 'white'
      out.push({
        cx: Math.round(rand() * 1000) / 10,
        cy: Math.round(rand() * 1000) / 10,
        r: Math.round((rand() * 1.3 + 0.4) * 100) / 100,
        delay: Math.round(rand() * 60) / 10,
        duration: Math.round((rand() * 4 + 3) * 10) / 10,
        color: palette,
      })
    }
    return out
  }, [count, seed])

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      role="presentation"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r * 0.18}
          fill={COLORS[s.color]}
          opacity={0.7}
          className="ls-star"
          style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
        />
      ))}
    </svg>
  )
}
