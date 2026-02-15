import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/** Square 800×800 crop for featured photos (e.g. thumbnails). */
export function urlForFeaturedPhoto(source: SanityImageSource): string {
  return urlFor(source)
    .width(800)
    .height(800)
    .fit('crop')
    .auto('format')
    .url()
}

/** Landscape crop for the slider so images overflow horizontally in the square card → parallax works. */
export function urlForFeaturedPhotoSlider(source: SanityImageSource): string {
  return urlFor(source)
    .width(1200)
    .height(800)
    .fit('crop')
    .auto('format')
    .url()
}
