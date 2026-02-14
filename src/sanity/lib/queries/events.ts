import { client } from '../client'

export type EventCMS = {
  _id: string
  title: string
  slug: string | null
  startDate: string
  endDate?: string | null
  location: string
  summary: string
  description?: string | null
  rsvpUrl?: string | null
  flyerImageUrl?: string | null
  flyerImageAlt?: string | null
  isFeatured?: boolean | null
  order?: number | null
}

const eventProjection = `
  _id,
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  summary,
  description,
  rsvpUrl,
  isFeatured,
  order,
  "flyerImageUrl": flyerImage.asset->url,
  "flyerImageAlt": coalesce(flyerImage.alt, title)
`

const cutoffPast = () =>
  new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
const cutoffFuture = () => new Date().toISOString()

/** Featured upcoming: isFeatured==true and (startDate >= now or endDate >= now), 0 or 1 */
export async function getFeaturedUpcomingEvent(): Promise<EventCMS | null> {
  const now = cutoffFuture()
  const query = `*[_type == "event" && isFeatured == true && (startDate >= $now || (defined(endDate) && endDate >= $now))] | order(startDate asc, order asc) [0]{ ${eventProjection} }`
  const results = await client.fetch<EventCMS[]>(query, { now })
  return results && results.length > 0 ? results[0] : null
}

/** Upcoming events: startDate >= (now - 1 day), sort by order asc then startDate asc, limited */
export async function getUpcomingEvents(
  limit: number = 3,
): Promise<EventCMS[]> {
  const cutoff = cutoffPast()
  const query = `*[_type == "event" && startDate >= $cutoff] | order(order asc, startDate asc) [0...$limit]{ ${eventProjection} }`
  return client.fetch(query, { cutoff, limit })
}

/** Past events: startDate < now, sort by order desc then startDate desc, limited */
export async function getPastEvents(limit: number = 12): Promise<EventCMS[]> {
  const cutoff = cutoffFuture()
  const query = `*[_type == "event" && startDate < $cutoff] | order(order desc, startDate desc) [0...$limit]{ ${eventProjection} }`
  return client.fetch(query, { cutoff, limit })
}
