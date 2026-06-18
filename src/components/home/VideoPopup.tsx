"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [needsPlayButton, setNeedsPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onScroll() {
      if (shown) return;
      if (window.scrollY > window.innerHeight * 0.4) {
        setShown(true);
        setOpen(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shown]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => setNeedsPlayButton(true));
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (video) video.pause();
    };
  }, [open]);

  if (!shown) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow hover:bg-white"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            controls
            playsInline
            className="h-full w-full object-cover"
            onClick={(e) => e.stopPropagation()}
          />
          {needsPlayButton && (
            <button
              type="button"
              onClick={() => {
                videoRef.current?.play();
                setNeedsPlayButton(false);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
              aria-label="재생"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-navy">
                ▶
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
