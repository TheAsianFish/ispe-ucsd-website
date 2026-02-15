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
