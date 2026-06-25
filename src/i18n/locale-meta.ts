import type { Locale } from '@/store/useAppStore'

export interface LocaleMeta {
  label: string
  native: string
  flag: string
}

// Single source of truth for per-locale display data. Add a new locale here only.
export const LOCALE_META: Record<Locale, LocaleMeta> = {
  th: { label: 'TH', native: 'ไทย', flag: '/icons/th.svg' },
  en: { label: 'EN', native: 'English', flag: '/icons/en.svg' },
  zh: { label: 'ZH', native: '中文', flag: '/icons/zh.svg' },
}
