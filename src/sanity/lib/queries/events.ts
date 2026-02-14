import { client } from '../client'

export type EventCMS = {
  _id: string
  title: string
  startDate: string
  location: string
  summary: string
  rsvpUrl?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

const eventProjection = `
  _id,
  title,
  startDate,
  location,
  summary,
  rsvpUrl,
  "imageUrl": flyerImage.asset->url,
  "imageAlt": flyerImage.alt
`

/** Upcoming events: startDate >= (now - 1 day), sorted by startDate asc, limited */
export async function getUpcomingEvents(limit: number): Promise<EventCMS[]> {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const query = `*[_type == "event" && startDate >= $cutoff] | order(startDate asc) [0...$limit]{ ${eventProjection} }`
  return client.fetch(query, { cutoff, limit })
}

/** All events, sorted by startDate desc (for future /events page) */
export async function getAllEvents(): Promise<EventCMS[]> {
  const query = `*[_type == "event"] | order(startDate desc){ ${eventProjection} }`
  return client.fetch(query)
}
