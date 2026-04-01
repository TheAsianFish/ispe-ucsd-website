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
  try {
    const query = `*[_type == "resource"] | order(category asc, order asc, title asc){ ${projection} }`
    return await sanityFetch<ResourceCMS[]>(query)
  } catch {
    return []
  }
}

/** Homepage preview: showOnHomepage first, then by order and title. */
export async function getResourcesForHome(
  limit: number = 4,
): Promise<ResourceCMS[]> {
  try {
    const query = `*[_type == "resource"] | order(select(showOnHomepage == true => 0, 1) asc, order asc, title asc)[0...$limit]{ ${projection} }`
    return await sanityFetch<ResourceCMS[]>(query, { limit })
  } catch {
    return []
  }
}

