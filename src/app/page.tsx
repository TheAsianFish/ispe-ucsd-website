import Link from "next/link";

import {
  boardTeaser,
  hero,
  programs,
  resources,
} from "@/content/mock";
import {
  getFeaturedUpcomingEvent,
  getUpcomingEvents,
} from "@/sanity/lib/queries/events";
import { getActiveAnnouncements } from "@/sanity/lib/queries/announcements";
import type { Event } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { FeaturedPhotosTrack } from "@/components/home/FeaturedPhotosTrack";
import type { PhotoItem } from "@/components/home/FeaturedPhotosTrack";

// Temporary placeholder photos for the featured track. TODO: Replace with Sanity (featuredPhotos or photo documents).
const FEATURED_PHOTOS: PhotoItem[] = [
  { src: "https://picsum.photos/seed/f1/800/600", alt: "Featured 1" },
  { src: "https://picsum.photos/seed/f2/800/600", alt: "Featured 2" },
  { src: "https://picsum.photos/seed/f3/800/600", alt: "Featured 3" },
  { src: "https://picsum.photos/seed/f4/800/600", alt: "Featured 4" },
  { src: "https://picsum.photos/seed/f5/800/600", alt: "Featured 5" },
  { src: "https://picsum.photos/seed/f6/800/600", alt: "Featured 6" },
  { src: "https://picsum.photos/seed/f7/800/600", alt: "Featured 7" },
  { src: "https://picsum.photos/seed/f8/800/600", alt: "Featured 8" },
];

function cmsToEvent(e: {
  _id: string;
  title: string;
  slug: string | null;
  startDate: string;
  endDate?: string | null;
  location: string;
  summary: string;
  description?: string | null;
  rsvpUrl?: string | null;
  flyerImageUrl?: string | null;
  flyerImageAlt?: string | null;
}): Event {
  return {
    id: e._id,
    title: e.title,
    slug: e.slug ?? "",
    startDate: e.startDate,
    endDate: e.endDate ?? undefined,
    location: e.location,
    summary: e.summary,
    description: e.description ?? undefined,
    rsvpUrl: e.rsvpUrl ?? undefined,
    flyerImageUrl: e.flyerImageUrl ?? undefined,
    flyerImageAlt: e.flyerImageAlt ?? undefined,
  };
}

export default async function Home() {
  const [featuredCMS, upcomingCMS, announcements] = await Promise.all([
    getFeaturedUpcomingEvent(),
    getUpcomingEvents(4),
    getActiveAnnouncements(),
  ]);
  const featured = featuredCMS ? cmsToEvent(featuredCMS) : null;
  const upcomingFiltered = featured
    ? upcomingCMS.filter((e) => e._id !== featured.id).slice(0, 3)
    : upcomingCMS.slice(0, 3);
  const upcomingPreview = upcomingFiltered.map(cmsToEvent);

  const programsPreview = programs.slice(0, 3);
  const resourcesPreview = resources.slice(0, 4);

  return (
    <div className="space-y-16 py-10 sm:py-12 lg:space-y-20 lg:py-16">
      {/* Hero */}
      <section aria-labelledby="home-hero">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              UC San Diego &middot; Student Chapter
            </p>
            <h1
              id="home-hero"
              className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {hero.title}
            </h1>
            <p className="max-w-xl text-base text-slate-600 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink variant="secondary" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              What you can expect
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>Regular events with industry professionals and alumni.</li>
              <li>Opportunities to visit local biotech and pharma sites.</li>
              <li>
                A student community focused on careers in pharma and biotech.
              </li>
            </ul>
            <p className="text-xs text-slate-500">
              All details are placeholders. Future officers can plug in real
              content or connect this site to a CMS when ready.
            </p>
          </div>
        </Container>
      </section>

      {/* Announcements banner */}
      {announcements.length > 0 ? (
        <section aria-label="Announcements">
          <Container>
            <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 sm:px-5 sm:py-4">
              {announcements.map((a) => (
                <div key={a.id} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                  <p className="text-sm text-slate-600">{a.body}</p>
                  {a.href && (
                    <p>
                      <a
                        href={a.href}
                        className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
                      >
                        {a.hrefLabel ?? "Learn more"}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Upcoming events preview */}
      <section aria-labelledby="home-upcoming-events">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="Events"
            title="Upcoming events at a glance."
            description="Stay informed about panels, workshops, and visits that help you explore careers in pharmaceutical engineering."
          />
          {featured ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Featured
              </p>
              <div className="w-full max-w-2xl">
                <EventCard event={featured} featured />
              </div>
            </div>
          ) : null}
          {upcomingPreview.length === 0 && !featured ? (
            <p className="text-sm text-slate-600">
              We don&apos;t have any upcoming events listed yet. Check back
              soon or follow our social channels for updates.
            </p>
          ) : upcomingPreview.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingPreview.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : null}
          <div>
            <Link
              href="/events"
              className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              View all events
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured photos track (drag to slide, images reveal behind barrier) */}
      <section aria-labelledby="home-featured-photos">
        <Container className="space-y-4">
          <h2
            id="home-featured-photos"
            className="text-xs font-semibold uppercase tracking-wide text-sky-700"
          >
            Featured
          </h2>
          <FeaturedPhotosTrack photos={FEATURED_PHOTOS} />
          <p className="text-xs text-slate-500">
            Drag or scroll to browse photos.
          </p>
        </Container>
      </section>

      {/* Programs preview */}
      <section aria-labelledby="home-programs">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="Programs"
            title="Programs that support your journey."
            description="From mentorship to site visits, our programs are designed to make the path into pharma and biotech more approachable."
          />
          <div
            id="home-programs"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {programsPreview.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <div>
            <Link
              href="/programs"
              className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              Explore all programs
            </Link>
          </div>
        </Container>
      </section>

      {/* Resources preview */}
      <section aria-labelledby="home-resources">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="Resources"
            title="Starter resources for students."
            description="These are placeholder links you can update later with the materials and tools you actually recommend."
          />
          <div
            id="home-resources"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {resourcesPreview.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <div>
            <Link
              href="/resources"
              className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              See all resources
            </Link>
          </div>
        </Container>
      </section>

      {/* Final membership CTA */}
      <section aria-labelledby="home-membership-cta">
        <Container>
          <div className="rounded-2xl bg-sky-600 px-6 py-8 text-white shadow-sm sm:px-8 md:flex md:items-center md:justify-between">
            <div className="space-y-2 md:max-w-xl">
              <h2
                id="home-membership-cta"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Ready to get involved?
              </h2>
              <p className="text-sm text-sky-100 sm:text-base">
                Join the ISPE UCSD Student Chapter to hear about events, site
                visits, and ways to shape the chapter as it grows.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:justify-end">
              <ButtonLink href="/membership" variant="secondary">
                Membership details
              </ButtonLink>
              <ButtonLink href="/contact">Contact the board</ButtonLink>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            <p>
              Board teaser: {boardTeaser.heading} &mdash; {boardTeaser.body}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

