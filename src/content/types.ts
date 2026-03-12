export type Event = {
  id: string
  title: string
  slug: string
  startDate: string
  endDate?: string
  location: string
  summary: string
  description?: string
  rsvpUrl?: string
  flyerImageUrl?: string
  flyerImageAlt?: string
  isFeatured?: boolean
  order?: number
}

export type AboutPageContent = {
  title: string
  intro: string | null
  missionHeading: string
  missionBody: string | null
  whatIsHeading: string
  whatIsBody: string | null
  contactCtaHeading: string
  contactCtaBody: string | null
  contactPrimaryLabel: string
  contactPrimaryHref: string
  contactSecondaryLabel: string
  contactSecondaryHref: string
}

export type Announcement = {
  id: string
  title: string
  body: string
  href: string | null
  hrefLabel: string | null
}

/** Program for cards and optional detail. slug present => link to /programs/[slug]. */
export type Program = {
  id: string
  title: string
  description: string
  slug?: string
  overview?: string
  howItWorks?: string[]
  commitment?: string[]
  benefits?: string[]
  whoItsFor?: string
  ctaLabel?: string
  ctaUrl?: string
}

export type Resource = {
  id: string
  title: string
  description: string
  url: string
  category?: string
  order?: number
}

export type MembershipPageContent = {
  title: string | null
  heroHeadline: string | null
  heroSubheadline: string | null
  primaryCtaLabel: string | null
  primaryCtaUrl: string | null
  secondaryCtaLabel: string | null
  secondaryCtaUrl: string | null
  highlights: string[] | null
  quickLinks: {
    discordUrl: string | null
    instagramUrl: string | null
    emailListUrl: string | null
    contactEmail: string | null
  } | null
  chapterVsNational: {
    sectionTitle: string | null
    chapterTitle: string | null
    chapterBullets: string[] | null
    nationalTitle: string | null
    nationalBullets: string[] | null
    nationalFeeText: string | null
    nationalJoinUrl: string | null
  } | null
  faq: Array<{ question: string | null; answer: string | null }> | null
}
