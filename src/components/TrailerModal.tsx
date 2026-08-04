"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { HERO_VIDEO, IMG } from "@/data/zones";

// Optional: drop in a YouTube video ID to use an embedded trailer instead of the mp4.
const TRAILER_YT = "";

type Ctx = { open: () => void; close: () => void };
const TrailerContext = createContext<Ctx | null>(null);

export function TrailerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <TrailerContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/30 bg-black shadow-premium ring-glow-gold"
            >
              <button
                onClick={close}
                aria-label="Close trailer"
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-cloud transition-colors hover:bg-gold hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-video w-full">
                {TRAILER_YT ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${TRAILER_YT}?autoplay=1&rel=0`}
                    title="PYUC Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="h-full w-full bg-black object-cover"
                    src={HERO_VIDEO}
                    poster={IMG.heroPoster}
                    controls
                    autoPlay
                    playsInline
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3">
                <div>
                  <div className="font-display text-lg uppercase text-cloud">
                    Presidential Youth Unity Cup 2026 — Official Trailer
                  </div>
                  <div className="font-heading text-[11px] uppercase tracking-widest text-gold">
                    One Nation · One Game · One Trophy
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TrailerContext.Provider>
  );
}

export function useTrailer() {
  const ctx = useContext(TrailerContext);
  if (!ctx) throw new Error("useTrailer must be used within TrailerProvider");
  return ctx;
}
