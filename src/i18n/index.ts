import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en/common.json'
import th from '@/locales/th/common.json'
import zh from '@/locales/zh/common.json'

export const SUPPORTED_LOCALES = ['en', 'th', 'zh'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export function isSupportedLocale(value: string | undefined | null): value is SupportedLocale {
  return value === 'en' || value === 'th' || value === 'zh'
}

const resources = {
  en: { common: en },
  th: { common: th },
  zh: { common: zh },
} as const

if (!i18n.isInitialized) {
  // Language is owned by the app store (zustand); i18next initialises to Thai and
  // the store syncs it on the client (see LanguageSync in App). With static
  // resources i18next initialises synchronously.
  i18n.use(initReactI18next).init({
    resources,
    lng: 'th',
    fallbackLng: 'th',
    supportedLngs: ['en', 'th', 'zh'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

export default i18n
