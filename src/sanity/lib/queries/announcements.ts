import { client } from '../client'
import type { Announcement } from '@/content/types'

const projection = `
  _id,
  title,
  body,
  href,
  hrefLabel
`

/** Fetches active announcements in time window, ordered by order asc, startAt desc, _createdAt desc. Limit 3. */
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  try {
    const now = new Date().toISOString()
    const query = `*[
      _type == "announcement" &&
      isActive == true &&
      (!defined(startAt) || startAt <= $now) &&
      (!defined(endAt) || endAt >= $now)
    ] | order(order asc, startAt desc, _createdAt desc) [0...3]{ ${projection} }`
    const rows = await client.fetch<
      { _id: string; title: string; body: string; href: string | null; hrefLabel: string | null }[]
    >(query, { now })
    if (!rows?.length) return []
    return rows.map((r) => ({
      id: r._id,
      title: r.title,
      body: r.body,
      href: r.href ?? null,
      hrefLabel: r.hrefLabel ?? null,
    }))
  } catch {
    return []
  }
}
