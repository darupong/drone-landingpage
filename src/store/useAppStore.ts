import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Theme = 'light' | 'dark'
export type Locale = 'en' | 'th' | 'zh'
export type CookieConsent = 'accepted' | 'declined'

interface AppState {
  theme: Theme
  locale: Locale
  cookieConsent: CookieConsent | null
  mobileMenuOpen: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setLocale: (locale: Locale) => void
  setCookieConsent: (consent: CookieConsent) => void
  setMobileMenuOpen: (open: boolean) => void
}

// No-op storage during SSG (no localStorage on the server).
const ssgSafeStorage = createJSONStorage(() =>
  typeof window !== 'undefined'
    ? window.localStorage
    : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
)

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      locale: 'th',
      cookieConsent: null,
      mobileMenuOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setLocale: (locale) => set({ locale }),
      setCookieConsent: (cookieConsent) => set({ cookieConsent }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: 'sp-app',
      storage: ssgSafeStorage,
      // Persist only durable preferences — not the transient mobile-menu state.
      partialize: (s) => ({ theme: s.theme, locale: s.locale, cookieConsent: s.cookieConsent }),
      // Don't hydrate during render — the first client render must match the
      // (Thai/light) prerendered HTML. App rehydrates from storage after mount.
      skipHydration: true,
    },
  ),
)
