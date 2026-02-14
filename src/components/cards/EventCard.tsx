import Image from "next/image";
import type { Event } from "@/content/types";

type EventCardProps = {
  event: Event;
  featured?: boolean;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

function formatDateLine(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return startDate;

  const datePart = dateFormat.format(start);
  const startTime = timeFormat.format(start);
  const timePart = endDate
    ? `${startTime}–${timeFormat.format(new Date(endDate))}`
    : startTime;

  return `${datePart} · ${timePart}`;
}

export function EventCard({ event, featured }: EventCardProps) {
  const dateLine = formatDateLine(event.startDate, event.endDate);

  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${featured ? "ring-1 ring-sky-200" : ""}`}
    >
      {event.flyerImageUrl ? (
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          <Image
            src={event.flyerImageUrl}
            alt={event.flyerImageAlt ?? event.title}
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
          {dateLine} · {event.location}
        </p>
      </header>
      <p className="text-sm text-slate-600">{event.summary}</p>
      {event.rsvpUrl ? (
        <div className="mt-auto pt-2">
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            RSVP
          </a>
        </div>
      ) : null}
    </article>
  );
}
