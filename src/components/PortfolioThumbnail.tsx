import type { PortfolioGradient } from '@/data/portfolio'
import { Starfield } from '@/components/Starfield'

interface PortfolioThumbnailProps {
  gradient: PortfolioGradient
  seed: number
  label?: string
}

/**
 * A reusable SVG thumbnail: gradient backdrop + starfield + a small "drone
 * formation" overlay tinted by `gradient.tint`. Used by the portfolio preview
 * grid and the full portfolio page.
 */
export function PortfolioThumbnail({ gradient, seed, label }: PortfolioThumbnailProps) {
  const amber = gradient.tint !== 'violet'
  const violet = gradient.tint !== 'amber'

  return (
    <div
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${gradient.classes}`}
    >
      <Starfield className="absolute inset-0 w-full h-full opacity-90" count={60} seed={seed} />
      {/* Drone formation: small ring of dots, color depends on tint */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <g transform="translate(50 52)">
          {[
            [0, -18],
            [12, -14],
            [18, -2],
            [16, 12],
            [6, 18],
            [-6, 18],
            [-16, 12],
            [-18, -2],
            [-12, -14],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={3.6} fill={amber ? '#d4a657' : '#e29db0'} opacity={0.35} />
              <circle r={1.1} fill={amber ? '#f3e3c3' : '#f7d9e0'} />
            </g>
          ))}
          {/* Inner star */}
          <g>
            <circle r={2.6} fill={violet ? '#e29db0' : '#d4a657'} opacity={0.45} />
            <circle r={0.9} fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  )
}
