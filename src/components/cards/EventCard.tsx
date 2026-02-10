import type { Event } from "@/content/mock";

type EventCardProps = {
  event: Event;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          {event.name}
        </h3>
        <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
          {formatDate(event.date)} &middot; {event.location}
        </p>
      </header>
      <p className="text-sm text-slate-600">{event.description}</p>
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
        <span>{event.imageAlt ?? "Event details coming soon."}</span>
        {event.rsvpUrl ? (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            RSVP
          </a>
        ) : null}
      </div>
    </article>
  );
}

