"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ScrollHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    function updateTarget() {
      ticking = false;
      const el = wrapperRef.current;
      const video = videoRef.current;
      if (!el || !video || !video.duration) return;

      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      targetTimeRef.current = progress * video.duration;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateTarget);
    }

    function tick() {
      const video = videoRef.current;
      if (video && video.duration) {
        const delta = targetTimeRef.current - video.currentTime;
        if (Math.abs(delta) > 0.005) {
          video.currentTime += delta * 0.22;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTarget();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-10 px-6">
        <div
          className={`text-center transition-opacity duration-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-[clamp(1.6em,5vw,3.5em)] font-bold leading-tight tracking-tight text-neutral-900">
            SEOUL NATIONAL UNIVERSITY RUGBY
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-navy-400 sm:text-base">
            One for All, All for One
          </p>
        </div>

        <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>

        <Link
          href="https://www.instagram.com/snu__rugby/"
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          Join the Team
        </Link>
      </div>
    </div>
  );
}
