import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export type BoardSeat = {
  role: string
  order?: number
  person: {
    name: string
    major?: string
    classYear?: string
    image?: any
    linkedin?: string
  }
}

export type BoardTerm = {
  title: string
  slug?: {
    current: string
  }
  seats: BoardSeat[]
}

export async function getCurrentBoard(): Promise<BoardTerm | null> {
  const query = `
    *[_type == "boardTerm" && isCurrent == true][0]{
      title,
      slug,
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
    }
  `

  return client.fetch(query)
}
