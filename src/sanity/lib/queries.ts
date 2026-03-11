import { sanityFetch } from "./client"

export type FeaturedPhotoItem = {
  alt?: string | null
  asset: unknown
}

export type FeaturedPhotosResult = {
  photos: FeaturedPhotoItem[]
}

/** First featuredPhotos document, or { photos: [] } if none or on error. */
export async function getFeaturedPhotos(): Promise<FeaturedPhotosResult> {
  try {
    const doc = await sanityFetch<FeaturedPhotosResult | null>(
      `*[_type == "featuredPhotos"][0]{ photos[]{ alt, asset } }`,
    )
    if (!doc?.photos?.length) return { photos: [] }
    return { photos: doc.photos }
  } catch {
    return { photos: [] }
  }
}

export type BoardSeat = {
  role: string
  order?: number
  person: {
    name: string
    major?: string
    classYear?: string
    image?: unknown
    linkedin?: string
  }
}

export type BoardTerm = {
  title: string
  slug?: { current: string }
  isCurrent?: boolean
  seats: BoardSeat[]
}

export type BoardTermSummary = {
  title: string
  slug?: { current: string }
  isCurrent?: boolean
}

const boardTermProjection = `
  title,
  slug,
  isCurrent,
  "seats": *[_type == "boardSeat" && references(^._id)]
    | order(order asc){
      role,
      order,
      person->{
        name,
        major,
        classYear,
        "image": headshot,
        linkedin
      }
    }
`

export async function getAllBoardTerms(): Promise<BoardTermSummary[]> {
  const query = `
    *[_type == "boardTerm"] | order(order desc){
      title,
      slug,
      isCurrent
    }
  `
  return sanityFetch(query)
}

export async function getBoardBySlug(slug: string): Promise<BoardTerm | null> {
  const query = `
    *[_type == "boardTerm" && slug.current == $slug][0]{
      ${boardTermProjection}
    }
  `
  return sanityFetch(query, { slug })
}

export async function getCurrentBoard(): Promise<BoardTerm | null> {
  const query = `
    *[_type == "boardTerm" && isCurrent == true][0]{
      ${boardTermProjection}
    }
  `
  return sanityFetch(query)
}
