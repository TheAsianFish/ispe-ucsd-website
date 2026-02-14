import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import type { Event } from "@/content/types";
import {
  getUpcomingEvents,
  getPastEvents,
  type EventCMS,
} from "@/sanity/lib/queries/events";

function cmsToEvent(e: EventCMS): Event {
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
    isFeatured: e.isFeatured ?? undefined,
    order: e.order ?? undefined,
  };
}

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const [upcomingCMS, pastCMS] = await Promise.all([
    getUpcomingEvents(100),
    getPastEvents(100),
  ]);
  const upcoming = upcomingCMS.map(cmsToEvent);
  const past = pastCMS.map(cmsToEvent);

  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Events
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Events and activities.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Events are managed in Sanity. Add and edit them in the Studio to
            keep this page up to date.
          </p>
        </header>

        {!hasUpcoming && !hasPast ? (
          <p className="text-sm text-slate-600">
            There are no events listed yet. Once you have your first event
            planned, add it in Sanity Studio and it will appear here
            automatically.
          </p>
        ) : (
          <>
            <section aria-labelledby="events-upcoming" className="space-y-4">
              <SectionHeading
                eyebrow="Upcoming"
                title="Upcoming events."
                description="Use this section for panels, workshops, tours, and socials that are open for students to join."
              />
              {hasUpcoming ? (
                <div
                  id="events-upcoming"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {upcoming.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      featured={event.isFeatured}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  No upcoming events right now. Check past events below or follow
                  our social channels.
                </p>
              )}
            </section>

            {hasPast && (
              <section aria-labelledby="events-past" className="space-y-4">
                <SectionHeading
                  eyebrow="Past events"
                  title="Previously hosted events."
                  description="Past events give students a sense of what the chapter tends to focus on from year to year."
                />
                <div
                  id="events-past"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {past.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      featured={event.isFeatured}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
