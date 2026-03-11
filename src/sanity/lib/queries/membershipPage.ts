import { sanityFetch } from '../client'
import type { MembershipPageContent } from '@/content/types'

const projection = `
  title,
  heroHeadline,
  heroSubheadline,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  highlights,
  quickLinks{
    discordUrl,
    instagramUrl,
    emailListUrl,
    contactEmail
  },
  chapterVsNational{
    sectionTitle,
    chapterTitle,
    chapterBullets,
    nationalTitle,
    nationalBullets,
    nationalFeeText,
    nationalJoinUrl
  },
  faq[]{
    question,
    answer
  }
`

/** Fetches the first membershipPage document. Returns null if none or on error. */
export async function getMembershipPage(): Promise<MembershipPageContent | null> {
  try {
    const doc = await sanityFetch<MembershipPageContent | null>(
      `*[_type == "membershipPage"][0]{ ${projection} }`,
    )
    return doc ?? null
  } catch {
    return null
  }
}
