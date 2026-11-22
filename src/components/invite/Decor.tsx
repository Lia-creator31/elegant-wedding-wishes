import type { CSSProperties } from "react";
import gold from "@/assets/flower-gold.webp.asset.json";
import burgundy from "@/assets/flower-burgundy.webp.asset.json";
import plum from "@/assets/flower-plum.webp.asset.json";
import navy from "@/assets/flower-navy.webp.asset.json";
import magenta from "@/assets/flower-magenta.webp.asset.json";
import { CarvedCorner, Finial } from "./Ornaments";

/**
 * Per-panel decoration for the halaman inti. Every panel gets either a floral
 * arrangement (one of five palettes, in a corner pattern of its own) or a gold
 * frame — never the same treatment twice in a row.
 */

export const FLOWERS = { gold, burgundy, plum, navy, magenta } as const;
export type FlowerKind = keyof typeof FLOWERS;
export type Corner = "bl" | "br" | "tl" | "tr";

/* each arrangement is painted growing out of the bottom-left; the wrapper mirrors it into place */
const CORNER: Record<Corner, string> = {
  bl: "-bottom-3 -left-3",
  br: "-bottom-3 -right-3 -scale-x-100",
  tl: "-top-3 -left-3 -scale-y-100",
  tr: "-top-3 -right-3 rotate-180",
};

export function Bloom({ kind, at, className = "w-36 sm:w-56", delay = 0 }: { kind: FlowerKind; at: Corner; className?: string; delay?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${CORNER[at]} ${className}`}>
      <img
        src={FLOWERS[kind].url}
        alt=""
        loading="lazy"
        width={720}
        height={720}
        className="bloom-sway bloom-shadow block w-full"
        style={{ animationDelay: `${delay}s` } as CSSProperties}
      />
    </div>
  );
}

/** Gold pigura laid over a whole panel. Three styles so frames differ from panel to panel. */
export function GoldFrame({ variant }: { variant: "ornate" | "double" | "arch" }) {
  if (variant === "ornate")
    return (
      <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-6">
        <div className="frame-gold-line absolute inset-0 rounded-sm" />
        <div className="frame-gold-line absolute inset-[7px] rounded-sm opacity-45" />
        <CarvedCorner className="absolute -left-1 -top-1 w-20 sm:w-28" />
        <CarvedCorner className="absolute -right-1 -top-1 w-20 -scale-x-100 sm:w-28" />
        <CarvedCorner className="absolute -bottom-1 -left-1 w-20 -scale-y-100 sm:w-28" />
        <CarvedCorner className="absolute -bottom-1 -right-1 w-20 rotate-180 sm:w-28" />
      </div>
    );
  if (variant === "double")
    return (
      <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-6">
        <div className="frame-gold-line absolute inset-0 rounded-[1.75rem]" />
        <div className="frame-gold-line absolute inset-[8px] rounded-[1.4rem] opacity-40 sm:inset-[10px]" />
        <span className="frame-gold-gem absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45" />
        <span className="frame-gold-gem absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45" />
      </div>
    );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-4 top-6 sm:inset-x-10 sm:bottom-8 sm:top-10">
      <div className="frame-gold-line absolute inset-0 rounded-t-[999px] rounded-b-2xl" />
      <div className="frame-gold-line absolute inset-[8px] rounded-t-[999px] rounded-b-xl opacity-40" />
      <Finial className="absolute -top-4 left-1/2 h-7 w-7 -translate-x-1/2 rotate-180" />
    </div>
  );
}
