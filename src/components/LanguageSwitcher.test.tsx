import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useAppStore } from '@/store/useAppStore'

describe('LanguageSwitcher (full variant)', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'th' })
  })

  it('renders a flag image for each language', () => {
    const { container } = render(<LanguageSwitcher variant="full" />)
    // Flags are decorative (aria-hidden, empty alt) so they have no img role;
    // query the DOM directly.
    const srcs = Array.from(container.querySelectorAll('img')).map((f) => f.getAttribute('src'))
    expect(srcs).toEqual(
      expect.arrayContaining(['/icons/th.svg', '/icons/en.svg', '/icons/zh.svg']),
    )
  })

  it('lists Thai first', () => {
    render(<LanguageSwitcher variant="full" />)
    const buttons = screen.getAllByRole('button')
    expect(within(buttons[0]).getByText('ไทย')).toBeInTheDocument()
  })

  it('switches the active locale in the store when another language is clicked', () => {
    render(<LanguageSwitcher variant="full" />)
    expect(useAppStore.getState().locale).toBe('th')

    screen.getByRole('button', { name: /English/i }).click()
    expect(useAppStore.getState().locale).toBe('en')
  })
})
