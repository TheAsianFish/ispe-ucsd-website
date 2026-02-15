"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type PhotoItem = { src: string; alt?: string };

type FeaturedPhotosTrackProps = {
  photos: PhotoItem[];
};

/**
 * Drag-to-slide image track with "images moving behind a barrier" reveal.
 * Replicates the exact behavior from the original index.html/index.css/index.js:
 * - pointerdown sets mouseDownAt; pointermove computes delta → percentage → clamp [-100, 0]; track.animate(translate); setImagePositions (parallax object-position).
 * - pointerup/pointercancel commits prevPercentage.
 * TODO: Later pass photos from Sanity (e.g. featuredPhotos singleton or photo documents).
 */
export function FeaturedPhotosTrack({ photos }: FeaturedPhotosTrackProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mouseDownAtRef = useRef<number>(0);
  const prevPercentageRef = useRef<number>(0);
  const currentPercentageRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  // Parallax: object-position follows viewport position (0% left, 100% right).
  // Same algorithm as original setImagePositions(nextPercentage).
  function setImagePositions(nextPercentage: number) {
    const track = trackRef.current;
    if (!track) return;
    const trackWidth = track.offsetWidth;
    const trackLeft =
      window.innerWidth / 2 + (nextPercentage / 100) * trackWidth;

    const children = track.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      const img = el.querySelector("img");
      if (!img) continue;
      const imageCenterInTrack = el.offsetLeft + el.offsetWidth / 2;
      const imageCenterX = trackLeft + imageCenterInTrack;
      const ratio = imageCenterX / window.innerWidth;
      const x = Math.max(0, Math.min(100, ratio * 100));
      img.style.objectPosition = `${x}% 50%`;
    }
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.animate(
      { transform: `translate(${prevPercentageRef.current}%, -50%)` },
      { duration: 0, fill: "forwards" }
    );
    setImagePositions(prevPercentageRef.current);
  }, [photos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onPointerDown = (e: PointerEvent) => {
      mouseDownAtRef.current = e.clientX;
      setIsDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = () => {
      prevPercentageRef.current = currentPercentageRef.current;
      mouseDownAtRef.current = 0;
      setIsDragging(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (mouseDownAtRef.current === 0) return;

      const mouseDelta = mouseDownAtRef.current - e.clientX;
      const maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      let nextPercentage = prevPercentageRef.current + percentage;
      nextPercentage = Math.max(-100, Math.min(0, nextPercentage));

      currentPercentageRef.current = nextPercentage;

      track.animate(
        { transform: `translate(${nextPercentage}%, -50%)` },
        { duration: 1200, fill: "forwards" }
      );
      setImagePositions(nextPercentage);
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = prevPercentageRef.current;
      const step =
        -Math.sign(e.deltaY) * Math.min(3, Math.abs(e.deltaY) * 0.02);
      const nextPercentage = Math.max(-100, Math.min(0, current + step));
      prevPercentageRef.current = nextPercentage;
      currentPercentageRef.current = nextPercentage;
      track.animate(
        { transform: `translate(${nextPercentage}%, -50%)` },
        { duration: 400, fill: "forwards" }
      );
      setImagePositions(nextPercentage);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      className={`relative h-[70vmin] max-h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      aria-label="Featured photos"
      style={{ minHeight: 280 }}
    >
      {/* Barrier viewport: track centered with left-50% top-50%, translate(percentage%, -50%) */}
      <div
        ref={trackRef}
        className="absolute left-1/2 top-1/2 flex w-max gap-[4vmin]"
        style={{
          pointerEvents: "auto",
          transform: "translate(0%, -50%)",
        }}
        role="list"
      >
        {photos.map((p, idx) => (
          <div
            key={`${p.src}-${idx}`}
            role="listitem"
            className="relative shrink-0 overflow-hidden rounded-xl bg-slate-200"
            style={{
              width: "20vmin",
              minWidth: "20vmin",
              height: "44vmin",
            }}
          >
            <Image
              src={p.src}
              alt={p.alt ?? `Featured photo ${idx + 1}`}
              fill
              draggable={false}
              sizes="20vmin"
              className="object-cover transition-[object-position] duration-200 ease-out"
              style={{ objectPosition: "100% 50%" }}
              priority={idx < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
