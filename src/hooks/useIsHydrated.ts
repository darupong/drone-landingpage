import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Returns `false` during SSR and the first client render, then `true` after
 * hydration. Lets a component render client-only UI without a setState-in-effect
 * (and without a hydration mismatch).
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
