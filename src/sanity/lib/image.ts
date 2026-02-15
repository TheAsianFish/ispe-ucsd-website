import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/** Square 800×800 crop for featured photos so portrait/landscape uploads don't break the slider. */
export function urlForFeaturedPhoto(source: SanityImageSource): string {
  return urlFor(source)
    .width(800)
    .height(800)
    .fit('crop')
    .auto('format')
    .url()
}
