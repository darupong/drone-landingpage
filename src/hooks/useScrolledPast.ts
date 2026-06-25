import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/**
 * `true` once the page is scrolled past `threshold` pixels. Backed by
 * `useSyncExternalStore`, so it re-renders only when the boolean flips and is
 * SSR-safe (always `false` on the server). Correct on initial load even if the
 * page is restored mid-scroll.
 */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}
