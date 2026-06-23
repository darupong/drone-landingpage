import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'
import { PORTFOLIO } from '@/data/portfolio'

const SITE_URL = 'https://luminasky.show'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`

type JsonLdType = 'home' | 'portfolio' | null

interface SeoHeadProps {
  /** Path of the page (e.g. "/" or "/portfolio" or "/terms"). */
  path?: string
  jsonLdType?: JsonLdType
  /** Title via i18n key (home/portfolio) … */
  titleKey?: 'seo.home' | 'seo.portfolio'
  /** … or direct title/description overrides (static content pages). */
  title?: string
  description?: string
}

const OG_LOCALE: Record<string, string> = { en: 'en_US', th: 'th_TH', zh: 'zh_CN' }

export function SeoHead({
  path = '/',
  jsonLdType = null,
  titleKey = 'seo.home',
  title: titleOverride,
  description: descriptionOverride,
}: SeoHeadProps) {
  const { t } = useTranslation()
  // Language is held in the app store; there is a single canonical URL per page.
  const locale = useAppStore((s) => s.locale)

  const title = titleOverride ?? t(`${titleKey}.title`)
  const description = descriptionOverride ?? t(`${titleKey}.description`)
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`
  const ogImageAlt = t('site.ogImageAlt')

  let jsonLd: object | null = null
  if (jsonLdType === 'home') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'LuminaSky',
      description: t('site.description'),
      url: canonical,
      image: DEFAULT_OG_IMAGE,
      logo: `${SITE_URL}/favicon.svg`,
      telephone: '+66 2 000 0000',
      email: 'hello@luminasky.show',
      priceRange: '฿฿฿',
      areaServed: { '@type': 'Country', name: 'Thailand' },
      address: { '@type': 'PostalAddress', addressCountry: 'TH', addressLocality: 'Bangkok' },
      knowsAbout: ['Drone Light Show', 'Aerial choreography', 'Event production', 'CAAT-licensed drone operations'],
      makesOffer: [
        { '@type': 'Offer', name: 'Essential drone show package', priceCurrency: 'THB', price: '350000' },
        { '@type': 'Offer', name: 'Signature drone show package', priceCurrency: 'THB', price: '850000' },
        { '@type': 'Offer', name: 'Cinematic drone show package', priceCurrency: 'THB', price: '1800000' },
      ],
    }
  } else if (jsonLdType === 'portfolio') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: 'LuminaSky', url: SITE_URL },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PORTFOLIO.length,
        itemListElement: PORTFOLIO.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: p.title,
            description: p.description,
            creator: { '@type': 'Organization', name: 'LuminaSky' },
            about: p.category,
            dateCreated: String(p.year),
            locationCreated: p.location,
            url: `${canonical}#${p.id}`,
          },
        })),
      },
    }
  }

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t('site.name')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content={OG_LOCALE[locale] ?? 'th_TH'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  )
}
