import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { events } from "@/content/mock";
import type { Event } from "@/content/types";

function mockEventToEvent(m: {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  rsvpUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}): Event {
  return {
    id: m.id,
    title: m.name,
    slug: "",
    startDate: m.date,
    location: m.location,
    summary: m.description,
    rsvpUrl: m.rsvpUrl,
    flyerImageUrl: m.imageUrl,
    flyerImageAlt: m.imageAlt,
  };
}

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  const upcoming = [...events.upcoming].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const past = [...events.past].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
            These event listings are mock data only. Replace them with real
            events later or connect to a CMS or spreadsheet that future officers
            can update without touching code.
          </p>
        </header>

        {!hasUpcoming && !hasPast ? (
          <p className="text-sm text-slate-600">
            There are no events listed yet. Once you have your first event
            planned, you can add it to the mock content file and it will appear
            here automatically.
          </p>
        ) : null}

        {hasUpcoming && (
          <section aria-labelledby="events-upcoming" className="space-y-4">
            <SectionHeading
              eyebrow="Upcoming"
              title="Upcoming events."
              description="Use this section for panels, workshops, tours, and socials that are open for students to join."
            />
            <div
              id="events-upcoming"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {upcoming.map((event) => (
                <EventCard key={event.id} event={mockEventToEvent(event)} />
              ))}
            </div>
          </section>
        )}

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
                <EventCard key={event.id} event={mockEventToEvent(event)} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}

