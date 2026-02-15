import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import FeaturedPhotoSlider from "@/components/FeaturedPhotoSlider";

export const metadata: Metadata = {
  title: "Test – Photo gallery slider",
  description: "Test page for the featured photo gallery slider.",
};

// Max 10 photos for the gallery; using picsum.photos placeholders
const TEST_PHOTOS = [
  { src: "https://picsum.photos/seed/1/800/600", alt: "Gallery 1" },
  { src: "https://picsum.photos/seed/2/800/600", alt: "Gallery 2" },
  { src: "https://picsum.photos/seed/3/800/600", alt: "Gallery 3" },
  { src: "https://picsum.photos/seed/4/800/600", alt: "Gallery 4" },
  { src: "https://picsum.photos/seed/5/800/600", alt: "Gallery 5" },
  { src: "https://picsum.photos/seed/6/800/600", alt: "Gallery 6" },
  { src: "https://picsum.photos/seed/7/800/600", alt: "Gallery 7" },
  { src: "https://picsum.photos/seed/8/800/600", alt: "Gallery 8" },
  { src: "https://picsum.photos/seed/9/800/600", alt: "Gallery 9" },
  { src: "https://picsum.photos/seed/10/800/600", alt: "Gallery 10" },
];

export default function TestPage() {
  return (
    <div className="py-10 sm:py-12">
      <Container className="space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Test
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Photo gallery slider
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Drag horizontally to browse. Max 10 photos.
          </p>
        </header>

        <FeaturedPhotoSlider photos={TEST_PHOTOS} height={320} />
      </Container>
    </div>
  );
}
