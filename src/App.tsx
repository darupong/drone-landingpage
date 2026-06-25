import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'motion/react'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { CookieConsent } from '@/components/CookieConsent'
import { useAppStore } from '@/store/useAppStore'
import '@/i18n'
import '@/styles/globals.css'

function StoreHydration() {
  // Rehydrate persisted prefs after mount so the first client render matches
  // the prerendered HTML (see skipHydration in the store).
  useEffect(() => {
    void useAppStore.persist.rehydrate()
  }, [])
  return null
}

function ThemeSync() {
  const theme = useAppStore((s) => s.theme)
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  return null
}

function LanguageSync() {
  const locale = useAppStore((s) => s.locale)
  const { i18n } = useTranslation()
  useEffect(() => {
    if (i18n.resolvedLanguage !== locale) void i18n.changeLanguage(locale)
    if (typeof document !== 'undefined') document.documentElement.lang = locale
  }, [locale, i18n])
  return null
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Hashless navigation → start the new page at the top.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 })
      return
    }
    // Hash navigation → scroll to the target section, retrying a few frames in
    // case it isn't mounted yet right after a cross-page navigation.
    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    let raf = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (frame++ < 60) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    // `domAnimation` covers the fade/transform/AnimatePresence features used
    // here (no layout/drag). `strict` makes any stray `motion.*` (vs `m.*`)
    // throw, keeping the lazy feature bundle from being defeated.
    <LazyMotion features={domAnimation} strict>
      <Helmet>
        <meta name="theme-color" content="#f7f1e6" />
      </Helmet>
      <StoreHydration />
      <ThemeSync />
      <LanguageSync />
      <ScrollManager />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <Outlet />
      <CookieConsent />
    </LazyMotion>
  )
}
