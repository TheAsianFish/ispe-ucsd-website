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
