"use client";

import { useEffect, useRef, useState } from "react";
import Crest from "./Crest";

/**
 * Site logo. Renders the shield artwork at /logo.png once it's saved into
 * `public/`. Until then (or if the image fails to load) it gracefully falls
 * back to the generated SVG crest so the layout never breaks.
 */
export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // An image that 404s before hydration never fires onError, so also check
  // the load state once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <Crest className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/logo.png"
      alt="Presidential Youth Unity Cup"
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
}
