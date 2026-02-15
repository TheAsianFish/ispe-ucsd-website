"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type FeaturedPhotoSliderProps = {
  photos: { src: string; alt?: string }[]; // pass 8–12
  height?: number; // px
};

export default function FeaturedPhotoSlider({
  photos,
  height = 320,
}: FeaturedPhotoSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Store drag state without re-rendering every move
  const drag = useRef({
    isDown: false,
    startX: 0,
    startPct: 0,
    pct: 0, // current translateX(%)
  });

  const [pct, setPct] = useState(0); // translateX(%), clamped [-100, 0]
  const [isDragging, setIsDragging] = useState(false);

  const clampedPct = useMemo(() => {
    // allow moving left to reveal later images; 0 means at beginning
    const v = Math.max(-100, Math.min(0, pct));
    return v;
  }, [pct]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      drag.current.isDown = true;
      drag.current.startX = e.clientX;
      drag.current.startPct = drag.current.pct;
      setIsDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = () => {
      drag.current.isDown = false;
      setIsDragging(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.isDown) return;

      // Convert mouse delta to percentage movement
      const deltaX = e.clientX - drag.current.startX;
      const maxDelta = window.innerWidth / 2; // same "feel" as the original snippet
      const next = drag.current.startPct + (deltaX / maxDelta) * 100;

      // Clamp: you can tune this (e.g., -80 if you have fewer photos)
      const clamped = Math.max(-100, Math.min(0, next));

      drag.current.pct = clamped;
      setPct(clamped);
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section className="w-full">
      {/* "Barrier" / viewport */}
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm"
        style={{ height }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute left-1/2 top-1/2 flex gap-6 select-none touch-pan-y"
          style={{
            transform: `translate(${clampedPct}%, -50%)`,
            transition: isDragging ? "none" : "transform 700ms ease",
            willChange: "transform",
          }}
          aria-label="Featured photos"
          role="list"
        >
          {photos.map((p, idx) => (
            <div
              key={`${p.src}-${idx}`}
              role="listitem"
              className="relative shrink-0 overflow-hidden rounded-2xl shadow-md"
              style={{
                width: "40vmin",
                height: "56vmin",
                maxWidth: 420,
                maxHeight: height - 24,
              }}
            >
              <Image
                src={p.src}
                alt={p.alt ?? `Featured photo ${idx + 1}`}
                fill
                draggable={false}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 420px"
                className="object-cover"
                style={{
                  // "parallax-ish" reveal feel: object-position shifts with the track
                  objectPosition: `${clampedPct + 100}% center`,
                  transition: isDragging ? "none" : "object-position 700ms ease",
                  willChange: "object-position",
                }}
                priority={idx < 2}
              />
            </div>
          ))}
        </div>

        {/* Optional subtle edge fade to sell the "behind a barrier" effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent" />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Drag left/right to browse photos.
      </p>
    </section>
  );
}
