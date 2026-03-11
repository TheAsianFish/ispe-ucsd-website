import { sanityFetch } from '../client'

/** Shape returned by GROQ for program list/cards (minimal). */
export type ProgramCMSSummary = {
  _id: string
  title: string
  slug: string | null
  shortDescription: string
}

/** Full program for detail page. */
export type ProgramCMS = ProgramCMSSummary & {
  overview?: string | null
  howItWorks?: string[] | null
  commitment?: string[] | null
  benefits?: string[] | null
  whoItsFor?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  featuredOnHome?: boolean | null
  order?: number | null
}

const summaryProjection = `
  _id,
  title,
  "slug": slug.current,
  shortDescription
`

const fullProjection = `
  ${summaryProjection},
  overview,
  howItWorks,
  commitment,
  benefits,
  whoItsFor,
  ctaLabel,
  ctaUrl,
  featuredOnHome,
  order
`

/** All programs for the Programs landing page. Order: by order, then title. */
export async function getAllPrograms(): Promise<ProgramCMSSummary[]> {
  const query = `*[_type == "program"] | order(order asc, title asc){ ${summaryProjection} }`
  return sanityFetch(query)
}

/** Single program by slug for the detail page. */
export async function getProgramBySlug(slug: string): Promise<ProgramCMS | null> {
  const query = `*[_type == "program" && slug.current == $slug][0]{ ${fullProjection} }`
  return sanityFetch(query, { slug })
}

/** Programs for homepage preview: featured first, then by order, limited. */
export async function getProgramsForHome(limit: number = 3): Promise<ProgramCMSSummary[]> {
  const query = `*[_type == "program"] | order(select(featuredOnHome == true => 0, 1) asc, order asc, title asc)[0...$limit]{ ${summaryProjection} }`
  return sanityFetch(query, { limit })
}

/** All program slugs for static params / sitemap. */
export async function getAllProgramSlugs(): Promise<string[]> {
  const query = `*[_type == "program" && defined(slug.current)].slug.current`
  return sanityFetch(query)
}
