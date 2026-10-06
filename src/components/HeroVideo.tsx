"use client";

import { useEffect, useRef } from "react";
import { publicPath } from "@/lib/deployment";

/**
 * Muted, looping hero background video. React doesn't reliably server-render the `muted`
 * attribute, which some browsers (notably iOS Safari) need before they'll autoplay, so it is set
 * and playback started here. Reduced-motion users get the still image underneath instead.
 *
 * There's no `poster`: the optimised hero image sits underneath and shows until the first frame,
 * so a poster would only download a second, full-size copy of it.
 */
export function HeroVideo({
  src,
  portraitSrc,
  objectPosition,
}: {
  src: string;
  /**
   * Optional crop for portrait phones, where the landscape video is mostly cropped away by
   * object-cover. It must be cut around the same `objectPosition` at the same scale, and be at least
   * 9:10 wide, so it shows exactly the same framing while downloading far fewer pixels.
   */
  portraitSrc?: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) {
        video.pause();
      } else {
        video.muted = true;
        video.play().catch(() => {
          // Autoplay blocked (e.g. low-power mode): the poster stays up.
        });
      }
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
      style={{ objectPosition }}
    >
      {/* Browsers pick the first matching source when the page loads. 2:3 leaves headroom for mobile toolbars. */}
      {portraitSrc && <source src={publicPath(portraitSrc)} type="video/mp4" media="(max-aspect-ratio: 2/3)" />}
      <source src={publicPath(src)} type="video/mp4" />
    </video>
  );
}
