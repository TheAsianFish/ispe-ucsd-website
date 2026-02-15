import { Container } from "@/components/ui/Container";
import { FeaturedPhotosTrack } from "@/components/home/FeaturedPhotosTrack";
import { getFeaturedPhotos } from "@/sanity/lib/queries";
import { urlForFeaturedPhoto } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export async function FeaturedPhotosSection() {
  const { photos } = await getFeaturedPhotos();
  if (!photos?.length) return null;

  const mappedPhotos = photos.map((photo) => ({
    src: urlForFeaturedPhoto(photo.asset as SanityImageSource),
    alt: photo.alt ?? undefined,
  }));

  return (
    <section aria-labelledby="home-featured-photos">
      <Container className="space-y-4">
        <h2
          id="home-featured-photos"
          className="text-xs font-semibold uppercase tracking-wide text-sky-700"
        >
          Featured Photos
        </h2>
        <FeaturedPhotosTrack photos={mappedPhotos} />
        <p className="text-xs text-slate-500">
          Drag or scroll to browse photos.
        </p>
      </Container>
    </section>
  );
}
