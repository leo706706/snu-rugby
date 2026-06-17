"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ScrollHero({ frames }: { frames: string[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    function update() {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setProgress(p);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const continuousIndex = progress * (frames.length - 1);

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {frames.map((src, i) => {
          const opacity = Math.max(0, 1 - Math.abs(continuousIndex - i));
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="scale-105 object-cover"
              style={{ opacity }}
            />
          );
        })}

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
