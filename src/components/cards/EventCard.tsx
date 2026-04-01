"use client";

import { useState } from "react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const dateLine = formatDateLine(event.startDate, event.endDate);

  return (
    <>
      <article
        className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${featured ? "ring-1 ring-sky-200" : ""}`}
      >
        {event.flyerImageUrl ? (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group relative h-48 w-full overflow-hidden rounded-lg bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label={`View full flyer for ${event.title}`}
          >
            <Image
              src={event.flyerImageUrl}
              alt={event.flyerImageAlt ?? event.title}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              View full
            </span>
          </button>
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

      {/* Full-image modal */}
      {modalOpen && event.flyerImageUrl ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Flyer for ${event.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* Stop click from bubbling through the image itself */}
          <div
            className="relative max-h-[90vh] max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.flyerImageUrl}
                alt={event.flyerImageAlt ?? event.title}
                className="block max-h-[85vh] w-full object-contain"
              />
            </div>
            <p className="mt-2 text-center text-xs text-white/70">
              Click outside to close
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
