"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ScrollHero({ posterUrl }: { posterUrl?: string }) {
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
    <div ref={wrapperRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          poster={posterUrl}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white transition-opacity duration-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-[clamp(1.8em,6vw,4.5em)] font-bold leading-tight tracking-tight">
            SEOUL NATIONAL UNIVERSITY RUGBY
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70 sm:text-base">
            One for All, All for One
          </p>
          <Link
            href="https://www.instagram.com/snu__rugby/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy transition-transform hover:scale-105"
          >
            Join the Team
          </Link>
        </div>
      </div>
    </div>
  );
}
