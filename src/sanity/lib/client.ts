import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const DEFAULT_SANITY_REVALIDATE_SECONDS = 60

/**
 * Shared Sanity fetch helper that opts into Next.js ISR by default.
 * This ensures authenticated Studio edits propagate to Vercel deployments
 * without having to remember `export const revalidate` on every route.
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: { revalidate?: number },
): Promise<T> {
  const revalidate =
    typeof options?.revalidate === 'number'
      ? options.revalidate
      : DEFAULT_SANITY_REVALIDATE_SECONDS

  // `next` options are consumed by Next.js caching layer.
  return client.fetch<T>(
    query,
    (params ?? {}) as never,
    { next: { revalidate } } as never,
  )
}
