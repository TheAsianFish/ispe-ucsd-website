import Link from "next/link";

import {
  boardTeaser,
  hero,
  programs,
  resources,
} from "@/content/mock";
import { getUpcomingEvents } from "@/sanity/lib/queries/events";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ResourceCard } from "@/components/cards/ResourceCard";

const pillars = [
  {
    title: "Explore careers",
    description:
      "Learn what roles exist across pharma, biotech, and related industries through panels, workshops, and conversations with professionals.",
  },
  {
    title: "Build skills",
    description:
      "Strengthen your understanding of GxP, technical fundamentals, and professional skills that support a transition into industry.",
  },
  {
    title: "Grow community",
    description:
      "Connect with peers at UC San Diego who are also interested in pharmaceutical engineering and nearby fields.",
  },
];

export default async function Home() {
  const cmsEvents = await getUpcomingEvents(3);
  const upcomingPreview = cmsEvents.map((e) => ({
    id: e._id,
    title: e.title,
    startDate: e.startDate,
    location: e.location,
    summary: e.summary,
    rsvpUrl: e.rsvpUrl ?? undefined,
    imageUrl: e.imageUrl ?? undefined,
    imageAlt: e.imageAlt ?? undefined,
  }));
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

      {/* Upcoming events preview */}
      <section aria-labelledby="home-upcoming-events">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="Events"
            title="Upcoming events at a glance."
            description="Stay informed about panels, workshops, and visits that help you explore careers in pharmaceutical engineering."
          />
          {upcomingPreview.length === 0 ? (
            <p className="text-sm text-slate-600">
              We don&apos;t have any upcoming events listed yet. Check back
              soon or follow our social channels for updates.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingPreview.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
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

      {/* What we do / pillars */}
      <section aria-labelledby="home-pillars">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="What we do"
            title="Helping students connect classroom learning to industry."
            description="ISPE UCSD supports students who are curious about how medicines are developed, manufactured, and delivered to patients."
          />
          <div
            id="home-pillars"
            className="grid gap-4 sm:grid-cols-3 sm:gap-6"
          >
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700"
                  >
                    ●
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600">{pillar.description}</p>
              </article>
            ))}
          </div>
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

