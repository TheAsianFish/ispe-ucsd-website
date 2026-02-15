import { client } from '../client'
import type { AboutPageContent } from '@/content/types'

const projection = `
  title,
  intro,
  missionHeading,
  missionBody,
  whatIsHeading,
  whatIsBody,
  contactCtaHeading,
  contactCtaBody,
  contactPrimaryLabel,
  contactPrimaryHref,
  contactSecondaryLabel,
  contactSecondaryHref
`

/** Fetches the single aboutPage document. Returns null if none or on error. */
export async function getAboutPage(): Promise<AboutPageContent | null> {
  try {
    const doc = await client.fetch<AboutPageContent | null>(
      `*[_type == "aboutPage" && _id == "aboutPage"][0]{ ${projection} }`,
    )
    return doc ?? null
  } catch {
    return null
  }
}
