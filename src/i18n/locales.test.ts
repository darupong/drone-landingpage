import { describe, it, expect } from 'vitest'
import en from '@/locales/en/common.json'
import th from '@/locales/th/common.json'
import zh from '@/locales/zh/common.json'
import { SUPPORTED_LOCALES } from '@/i18n'
import { LOCALE_META } from '@/i18n/locale-meta'

type Json = Record<string, unknown>

function flattenKeys(obj: Json, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value && typeof value === 'object' && !Array.isArray(value)
      ? flattenKeys(value as Json, path)
      : [path]
  })
}

describe('translation key parity', () => {
  const enKeys = flattenKeys(en as Json).sort()

  it.each([
    ['th', th],
    ['zh', zh],
  ])('%s has exactly the same keys as en (no missing/extra translations)', (_name, locale) => {
    expect(flattenKeys(locale as Json).sort()).toEqual(enKeys)
  })
})

describe('locale display metadata', () => {
  it('LOCALE_META covers every supported locale with non-empty fields', () => {
    for (const loc of SUPPORTED_LOCALES) {
      const meta = LOCALE_META[loc]
      expect(meta, `missing meta for ${loc}`).toBeTruthy()
      expect(meta.label).toBeTruthy()
      expect(meta.native).toBeTruthy()
      expect(meta.flag).toMatch(/^\/icons\/[a-z]+\.svg$/)
    }
  })

  it('lists Thai first so it is the default and top of the switcher', () => {
    expect(SUPPORTED_LOCALES[0]).toBe('th')
  })
})
