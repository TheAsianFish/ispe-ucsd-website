import Image from "next/image";
import type { Event } from "@/content/types";

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
      {event.imageUrl ? (
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          <Image
            src={event.imageUrl}
            alt={event.imageAlt ?? event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <header className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          {event.title}
        </h3>
        <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
          {formatDate(event.startDate)} &middot; {event.location}
        </p>
      </header>
      <p className="text-sm text-slate-600">{event.summary}</p>
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
