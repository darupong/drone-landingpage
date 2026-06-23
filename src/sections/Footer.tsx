import { useState, type FormEvent, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin } from 'lucide-react'
import { CONTENT_SLUGS } from '@/data/pages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Reveal } from '@/components/Reveal'

type ColKey = 'explore' | 'company' | 'support'

const COL_LINKS: Record<ColKey, string[]> = {
  explore: ['services', 'portfolio', 'process', 'pricing'],
  company: ['about', 'press', 'careers', 'contact'],
  support: ['faq', 'safety', 'permits', 'terms'],
}

/** Inline Instagram glyph (lucide v1 dropped brand marks). */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.3-1.5 1.6-1.5h1.6V4.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.4H8v3.1h2.6V22h2.9z" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26.1 26.1 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8zM10 15V9l5 3-5 3z" />
    </svg>
  )
}

/** Inline TikTok glyph. */
function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.6 7.6a6.4 6.4 0 0 1-3.8-1.3v8.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3a2.6 2.6 0 1 0 1.8 2.5V2h2.9a4 4 0 0 0 3.8 3.9v1.7z" />
    </svg>
  )
}

/** Inline LINE glyph. */
function LineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3C6.5 3 2 6.5 2 10.9c0 4 3.5 7.3 8.2 7.9.3 0 .8.2.9.5.1.2.1.6.1.8l-.1.7c0 .2-.2.7.6.4.7-.3 4.2-2.4 5.8-4.2 1.1-1.2 1.6-2.5 1.6-4.1C19.1 6.5 14.6 3 12 3zM8.6 13H6.7c-.2 0-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4h.3c.2 0 .4.2.4.4v3.3H8.6c.2 0 .4.2.4.4v.2c0 .2-.2.2-.4.2zm1.7-.4c0 .2-.2.4-.4.4h-.3c-.2 0-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4h.3c.2 0 .4.2.4.4v3.7zm4.6 0c0 .2-.2.4-.4.4h-.3c-.1 0-.2 0-.3-.1l-1.7-2.3v2c0 .2-.2.4-.4.4h-.3c-.2 0-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4h.3c.1 0 .2.1.3.2l1.7 2.3v-2c0-.3.2-.5.4-.5h.3c.2 0 .4.2.4.4v3.7zm3-2.5c.2 0 .4.2.4.4v.3c0 .2-.2.4-.4.4h-1.3v.9h1.3c.2 0 .4.2.4.4v.3c0 .2-.2.4-.4.4h-2c-.2 0-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4h2c.2 0 .4.2.4.4v.3c0 .2-.2.4-.4.4h-1.3v.9h1.3z" />
    </svg>
  )
}

const SOCIAL = [
  { key: 'instagram', Icon: InstagramIcon, href: 'https://instagram.com/luminasky.show' },
  { key: 'facebook', Icon: FacebookIcon, href: 'https://facebook.com/luminasky.show' },
  { key: 'youtube', Icon: YoutubeIcon, href: 'https://youtube.com/@luminasky' },
  { key: 'tiktok', Icon: TikTokIcon, href: 'https://tiktok.com/@luminasky' },
  { key: 'line', Icon: LineIcon, href: 'https://line.me/R/ti/p/@luminasky' },
] as const

export function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Language is in the store (no locale in the URL), so links are bare paths.
  const hrefFor = (key: string) => {
    if (key === 'portfolio') return '/portfolio'
    if (key === 'contact') return '/#cta'
    // Static company/legal pages sit at bare paths (e.g. /about, /terms).
    if (CONTENT_SLUGS.includes(key)) return `/${key}`
    return `/#${key}`
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="container-page py-16">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 font-semibold tracking-tight text-lg">
                <span aria-hidden="true" className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-amber-400 to-rose-400" />
                {t('site.name')}
              </div>
              <p className="mt-3 text-[var(--color-muted-foreground)]">{t('footer.tagline')}</p>

              <ul className="mt-6 space-y-2 text-sm text-[var(--color-muted-foreground)]">
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <a href={`tel:${t('footer.contact.phone')}`} className="hover:text-[var(--color-foreground)] transition-colors">
                    {t('footer.contact.phone')}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-[var(--color-foreground)] transition-colors">
                    {t('footer.contact.email')}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>{t('footer.contact.address')}</span>
                </li>
              </ul>

              <form onSubmit={onSubmit} className="mt-7 max-w-md">
                <Label htmlFor="newsletter-email" className="text-sm font-semibold">
                  {t('footer.newsletter.title')}
                </Label>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  {t('footer.newsletter.description')}
                </p>
                <div className="mt-3 flex gap-2">
                  <Input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-label={t('footer.newsletter.emailLabel')}
                    placeholder={t('footer.newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit">{t('footer.newsletter.cta')}</Button>
                </div>
                {submitted ? (
                  <p role="status" className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                    {t('footer.newsletter.success')}
                  </p>
                ) : null}
              </form>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
              {(Object.keys(COL_LINKS) as ColKey[]).map((col) => (
                <div key={col}>
                  <h3 className="text-sm font-semibold tracking-tight">
                    {t(`footer.columns.${col}.title`)}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {COL_LINKS[col].map((linkKey) => (
                      <li key={linkKey}>
                        <Link
                          to={hrefFor(linkKey)}
                          className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                          {t(`footer.columns.${col}.links.${linkKey}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Separator className="mt-12" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-[var(--color-muted-foreground)]">
              © {year} {t('site.name')}. {t('footer.rights')}
            </p>
            <nav aria-label="Legal" className="flex items-center gap-3 text-[var(--color-muted-foreground)]">
              {(['privacy', 'cookies', 'terms'] as const).map((slug) => (
                <Link key={slug} to={`/${slug}`} className="hover:text-[var(--color-foreground)] transition-colors">
                  {t(`footer.legal.${slug}`)}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-2" aria-label="Social media">
              {SOCIAL.map(({ key, Icon, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t(`footer.social.${key}`)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                  >
                    <Icon width={16} height={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
