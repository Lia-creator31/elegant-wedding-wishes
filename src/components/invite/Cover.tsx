import { useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import gateL from "@/assets/gate-left-real.webp.asset.json";
import gateR from "@/assets/gate-right-real.webp.asset.json";
import archImg from "@/assets/garden-arch.webp.asset.json";
import monogram from "@/assets/monogram.png.asset.json";
import openBtn from "@/assets/open-btn.png.asset.json";
import gardenPath from "@/assets/garden-path.webp.asset.json";
import leaves from "@/assets/garden-leaves.webp.asset.json";
import { ButterflyFlock } from "./Butterfly";
import { Twinkles } from "./LiveOrnaments";
import { WEDDING } from "@/lib/wedding";

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Scene 1–2: the garden door. Tapping the door swings both leaves open slowly while
 * a soft light expands from the doorway and reveals the garden (rendered underneath).
 */
export function Cover({ guest, onOpenStart, onOpened }: { guest: string; onOpenStart: () => void; onOpened: () => void }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const doorRef = useRef<HTMLButtonElement>(null);
  const cx = useMotionValue(50);
  const cy = useMotionValue(45);
  const r = useMotionValue(-120);
  const r2 = useTransform(r, (v) => v + 120);
  const mask = useMotionTemplate`radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, black ${r2}px)`;

  const DOOR = reduce ? 0.6 : 2.4;

  const open = () => {
    if (opening) return;
    setOpening(true);
    const rect = doorRef.current?.getBoundingClientRect();
    if (rect) {
      cx.set(rect.left + rect.width / 2);
      cy.set(rect.top + rect.height / 2);
    }
    onOpenStart();
    const max = Math.hypot(window.innerWidth, window.innerHeight) * 1.1;
    animate(r, max, { duration: reduce ? 0.8 : 2.2, delay: reduce ? 0 : 0.9, ease: [0.5, 0, 0.3, 1] });
    window.setTimeout(onOpened, (reduce ? 0.9 : DOOR + 0.8) * 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* night garden backdrop — a light opening from the doorway reveals the garden beneath */}
      <motion.div className="absolute inset-0" style={opening ? { WebkitMaskImage: mask, maskImage: mask } : {}}>
        <div className="absolute inset-0 bg-cover-royal">
          <img src={gardenPath.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" />
          <img src={leaves.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-soft-light" />
          <div className="cover-vignette absolute inset-0" />
          <Twinkles count={14} seed={7} />
        </div>
        <ButterflyFlock count={3} />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pb-5 pt-[7vh] text-center">
        <motion.div
          className="flex flex-col items-center"
          animate={opening ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[11px] uppercase tracking-[0.45em] text-cream/80"
            animate={opening ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Wedding of
          </motion.p>
          <h1 className="mt-2 font-script text-5xl text-gold-grad sm:text-6xl">
            {WEDDING.bride} & {WEDDING.groom}
          </h1>
          <p className="mt-1 font-display text-lg italic text-cream/85">18 & 20 Desember 2026</p>
          <div className="mt-5 h-px w-24 bg-gold-grad opacity-60" />
          <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-cream/70">Kepada Yth.</p>
          <p className="max-w-xs truncate font-display text-xl font-semibold text-ivory">{guest}</p>
        </motion.div>
        {/* The garden door — a realistic iron gate standing inside a rose-and-hydrangea stone arch */}
        <button
          ref={doorRef}
          onClick={open}
          aria-label="Buka pintu taman"
          className="group relative mt-auto aspect-[2/3] h-[min(46vh,400px)] cursor-pointer"
          style={{ perspective: 1100 }}
        >
          {/* warm light glowing through the archway */}
          <motion.div
            className="glow-pulse absolute left-[30%] top-[14%] h-[76%] w-[40%] rounded-t-full bg-[radial-gradient(ellipse_at_center,oklch(0.92_0.07_85/0.85),oklch(0.79_0.095_80/0.3)_45%,transparent_75%)] blur-md"
            animate={opening ? { opacity: 1, scale: 1.25 } : {}}
            transition={{ duration: 1.6 }}
          />
          <motion.img
            src={monogram.url}
            alt="Monogram S&L"
            className="absolute left-1/2 top-[17%] h-[24%] -translate-x-1/2 object-contain"
            animate={opening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="absolute left-[28.4%] top-[44.6%] h-[45.2%] w-[45.2%]" style={{ perspective: 900 }}>
            <motion.img
              src={gateL.url}
              alt=""
              className="absolute left-0 top-0 h-full w-1/2 object-fill drop-shadow-[0_8px_14px_oklch(0.12_0.04_260/0.7)]"
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              animate={opening ? { rotateY: -105, opacity: [1, 1, 0] } : { rotateY: 0 }}
              transition={{ duration: DOOR, ease: EASE, opacity: { duration: DOOR + 0.6, times: [0, 0.75, 1] } }}
            />
            <motion.img
              src={gateR.url}
              alt=""
              className="absolute right-0 top-0 h-full w-1/2 object-fill drop-shadow-[0_8px_14px_oklch(0.12_0.04_260/0.7)]"
              style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
              animate={opening ? { rotateY: 105, opacity: [1, 1, 0] } : { rotateY: 0 }}
              transition={{ duration: DOOR, ease: EASE, opacity: { duration: DOOR + 0.6, times: [0, 0.75, 1] } }}
            />
          </div>
          {/* the stone arch sits in front so the pillars hide the hinges; grounded by a soft contact shadow */}
          <div className="cover-ground-shadow absolute -bottom-[2%] left-[4%] h-[7%] w-[92%]" />
          <img src={archImg.url} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_14px_22px_oklch(0.1_0.04_260/0.65)]" />
        </button>
        <motion.div
          className="flex flex-col items-center"
          animate={opening ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button onClick={open} className="floaty -mt-2 w-20 transition-transform hover:scale-105 sm:w-28" aria-label="Buka Undangan">
            <img src={openBtn.url} alt="Buka Undangan" className="w-full" />
          </button>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream/60">Sentuh pintu untuk masuk</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
