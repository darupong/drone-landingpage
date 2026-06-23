export type PortfolioCategory = 'wedding' | 'corporate' | 'festival' | 'brand'

export interface PortfolioGradient {
  /** Tailwind gradient classes (from-X via-Y to-Z) used as the card backdrop. */
  classes: string
  /** Tints for the inline drone-formation overlay (amber, violet). */
  tint: 'amber' | 'violet' | 'mixed'
}

export interface PortfolioProject {
  /** URL-friendly slug; also used as the dialog open anchor `#slug`. */
  id: string
  /** Project headline shown on the card and dialog. */
  title: string
  /** Real-sounding client name. */
  client: string
  /** Production year. */
  year: number
  /** Category for filtering. */
  category: PortfolioCategory
  /** Drone count, free-form string (e.g. "300 drones"). */
  drones: string
  /** Show length, e.g. "9 minutes". */
  duration: string
  /** Venue or city. */
  location: string
  /** Short marketing description (1–2 sentences). */
  description: string
  /** Services list, comma-separated. */
  services: string
  /** Outcome / results sentence. */
  result: string
  /** Visual config for the card thumbnail. */
  gradient: PortfolioGradient
  /** Grid spans for masonry-ish rhythm (col-span-N, row-span-N). */
  span: string
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'paragon-countdown-2025',
    title: 'Siam Paragon Countdown 2025',
    client: 'Siam Paragon',
    year: 2025,
    category: 'festival',
    drones: '500 drones',
    duration: '12 minutes',
    location: 'Parc Paragon, Bangkok',
    description:
      'A New Year countdown choreographed across central Bangkok, syncing 500 drones with a live orchestral score for an audience of more than 80,000.',
    services: 'Concept, choreography, CAAT permits, on-site production, aftermovie',
    result: 'Trended #1 on X overnight. 12M+ views on the official clip within a week.',
    gradient: { classes: 'from-rose-700 via-rose-900 to-stone-950', tint: 'mixed' },
    span: 'md:col-span-8 md:row-span-2',
  },
  {
    id: 'king-power-anniversary',
    title: 'King Power Rangnam — 25th Anniversary',
    client: 'King Power Group',
    year: 2024,
    category: 'corporate',
    drones: '300 drones',
    duration: '9 minutes',
    location: 'Rangnam, Bangkok',
    description:
      'A 25-year anniversary show that lifted the King Power crown logo into the sky above Rangnam, followed by a tribute sequence to the company founders.',
    services: 'Creative direction, 3D choreography, sound design, full crew',
    result: 'Aired on Thai national news; staff retention campaign ROI tripled the next quarter.',
    gradient: { classes: 'from-amber-500 via-rose-900 to-stone-950', tint: 'amber' },
    span: 'md:col-span-4',
  },
  {
    id: 'wedding-phuket-villa',
    title: 'A Villa Wedding in Phuket',
    client: 'Khun Phanuwat & Khun Naphatsorn',
    year: 2025,
    category: 'wedding',
    drones: '180 drones',
    duration: '7 minutes',
    location: 'Trisara, Phuket',
    description:
      'A private beachfront ceremony where the couple\'s initials appeared above the Andaman Sea at the end of dinner, followed by a moving heart that bloomed open.',
    services: 'Concept, design, permitting, on-site team, 60-second film',
    result: 'Featured in three regional wedding publications; over 2M organic reels views.',
    gradient: { classes: 'from-rose-500 via-amber-700 to-stone-950', tint: 'amber' },
    span: 'md:col-span-4',
  },
  {
    id: 'central-pattana-grand-opening',
    title: 'Central Pattana Mall Opening',
    client: 'Central Pattana',
    year: 2024,
    category: 'corporate',
    drones: '250 drones',
    duration: '8 minutes',
    location: 'Nakhon Ratchasima',
    description:
      'Grand opening of a new flagship mall — drones formed the building silhouette before bursting into a regional cultural motif.',
    services: 'Concept, animation, choreography, on-site, full production',
    result: 'Foot traffic exceeded launch-week target by 38%; #1 trending hashtag locally.',
    gradient: { classes: 'from-amber-600 via-rose-900 to-stone-950', tint: 'mixed' },
    span: 'md:col-span-4',
  },
  {
    id: 'wonderfruit-festival',
    title: 'Wonderfruit Festival — Drone Set',
    client: 'Scratch First Co.',
    year: 2024,
    category: 'festival',
    drones: '220 drones',
    duration: '11 minutes',
    location: 'The Fields, Pattaya',
    description:
      'A nightly drone set across the festival weekend, themed around regeneration and synced to a live ambient music performance.',
    services: 'Multi-night production, choreography, music sync, crew',
    result: 'Sold-out festival drove 18% more day-passes after viral clips.',
    gradient: { classes: 'from-rose-700 via-rose-900 to-stone-950', tint: 'violet' },
    span: 'md:col-span-8',
  },
  {
    id: 'aia-product-launch',
    title: 'AIA Product Launch',
    client: 'AIA Thailand',
    year: 2024,
    category: 'brand',
    drones: '200 drones',
    duration: '7 minutes',
    location: 'Sirimongkhon Hall, Bangkok',
    description:
      'A corporate product launch turned spectacle: drone choreography revealing a 3D animated insurance plan and the campaign tagline.',
    services: 'Concept, animation, full crew, integrated stage AV',
    result: 'Lead-gen for the new product was 2.4x the rolling 6-month average.',
    gradient: { classes: 'from-rose-700 via-rose-900 to-stone-950', tint: 'violet' },
    span: 'md:col-span-4',
  },
  {
    id: 'gentlewoman-launch',
    title: 'The Gentlewoman BKK Launch',
    client: 'The Gentlewoman Magazine',
    year: 2025,
    category: 'brand',
    drones: '150 drones',
    duration: '6 minutes',
    location: 'Charoen Krung, Bangkok',
    description:
      'Editorial launch event with drones writing the cover headline above the Chao Phraya river, framed by the riverside skyline.',
    services: 'Concept, choreography, social-first content delivery',
    result: 'Mentioned across Asian fashion press; +35K Instagram followers in 3 days.',
    gradient: { classes: 'from-amber-500 via-orange-800 to-stone-950', tint: 'amber' },
    span: 'md:col-span-4',
  },
  {
    id: 'wedding-hua-hin-sunset',
    title: 'Sunset Wedding, Hua Hin',
    client: 'Khun Saran & Dr. Mananchaya',
    year: 2024,
    category: 'wedding',
    drones: '120 drones',
    duration: '5 minutes',
    location: 'Aleenta, Hua Hin',
    description:
      'A sunset ceremony where the drones rose from behind the dunes as the couple exchanged rings, ending with their wedding date in the sky.',
    services: 'Concept, choreography, permits, on-site crew',
    result: 'Featured on the venue\'s official 2025 marketing reel.',
    gradient: { classes: 'from-amber-400 via-rose-800 to-stone-950', tint: 'amber' },
    span: 'md:col-span-4',
  },
  {
    id: 'singha-anniversary',
    title: 'Singha 90th Anniversary',
    client: 'Boon Rawd Brewery',
    year: 2023,
    category: 'corporate',
    drones: '400 drones',
    duration: '10 minutes',
    location: 'Singha Park, Chiang Rai',
    description:
      'A 90-year retrospective in the sky — drones travelled through nine eras of the brand, ending with the founder\'s portrait above the park.',
    services: 'Concept, choreography, music original score, full production',
    result: 'Earned a Thailand Creative Excellence Award (Live Experience).',
    gradient: { classes: 'from-amber-700 via-rose-900 to-stone-950', tint: 'amber' },
    span: 'md:col-span-6',
  },
  {
    id: 'beauty-jeju',
    title: 'K-Beauty Jeju Brand Trip',
    client: 'Innisfree (Trip activation)',
    year: 2024,
    category: 'brand',
    drones: '180 drones',
    duration: '6 minutes',
    location: 'Jeju Island, Korea',
    description:
      'Closing-night activation for a multinational brand trip — drones traced Jeju\'s coastline before forming the product silhouette.',
    services: 'Travel production, local permits, choreography, on-site crew',
    result: '12M+ TikTok views across creator accounts during the trip.',
    gradient: { classes: 'from-rose-500 via-rose-900 to-stone-950', tint: 'violet' },
    span: 'md:col-span-6',
  },
  {
    id: 'songkran-bangkok',
    title: 'Songkran City Festival 2024',
    client: 'Bangkok Metropolitan Administration',
    year: 2024,
    category: 'festival',
    drones: '350 drones',
    duration: '11 minutes',
    location: 'Sanam Luang, Bangkok',
    description:
      'A Songkran tribute show — drones formed traditional motifs of water, garlands, and Buddhist symbols in seven sequenced scenes.',
    services: 'Cultural research, choreography, permits, full crew',
    result: 'Reached 4.5M cumulative impressions across BMA channels.',
    gradient: { classes: 'from-amber-700 via-rose-900 to-stone-950', tint: 'violet' },
    span: 'md:col-span-6',
  },
  {
    id: 'wedding-chiang-mai-forest',
    title: 'Chiang Mai Forest Wedding',
    client: 'Khun Pattaranan & Khun Jirayu',
    year: 2025,
    category: 'wedding',
    drones: '160 drones',
    duration: '6 minutes',
    location: 'Mae Rim, Chiang Mai',
    description:
      'A forest-canopy wedding where drones rose above the mist after dinner, ending with a moving wedding date and two birds in flight.',
    services: 'Concept, choreography, permits, aftermovie',
    result: 'Shortlisted as Asia\'s Top 10 Destination Weddings of 2025.',
    gradient: { classes: 'from-rose-800 via-rose-900 to-stone-950', tint: 'mixed' },
    span: 'md:col-span-6',
  },
]
