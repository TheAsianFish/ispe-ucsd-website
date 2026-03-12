import { sanityFetch } from '../client'

export type ResourceCMS = {
  _id: string
  title: string
  description: string
  url: string
  category: string | null
  order?: number | null
  featured?: boolean | null
  showOnHomepage?: boolean | null
}

const projection = `
  _id,
  title,
  description,
  url,
  category,
  order,
  featured,
  showOnHomepage
`

/** All resources for the Resources page. Order: category, then order, then title. */
export async function getAllResources(): Promise<ResourceCMS[]> {
  const query = `*[_type == "resource"] | order(category asc, order asc, title asc){ ${projection} }`
  return sanityFetch(query)
}

