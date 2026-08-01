"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/hero-slides";

const AUTOPLAY_MS = 6500;

export function Hero() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const slide = HERO_SLIDES[index];

  const goTo = React.useCallback((next: number) => {
    setIndex((next + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, paused, goTo]);

  return (
    <section
      id="hero-section"
      className="relative flex h-[92vh] min-h-[640px] w-full items-end overflow-hidden bg-midnight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image crossfade + slow Ken Burns zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" }}
            className="relative h-full w-full"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          {/* Readability overlays: left-to-right gradient + bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/70 to-[#07090e]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Nav (kept minimal here; full Navbar overlays on top via z-index) */}

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-24 pt-32 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-bull">
                {slide.eyebrow}
              </span>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.headline}
                <br />
                <span className="text-accent-platinum">{slide.headlineAccent}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-balance text-base leading-relaxed text-white/70 sm:text-lg">
                {slide.subcopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={slide.primaryCta.href}
                  className="group flex items-center gap-2 rounded-full bg-bull px-7 py-3.5 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {slide.secondaryCta && (
                  <Link
                    href={slide.secondaryCta.href}
                    className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="mt-14 flex items-center justify-center gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-1 w-10 overflow-hidden rounded-full bg-white/20"
            >
              {i === index && (
                <motion.span
                  key={paused ? `${s.id}-paused` : s.id}
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-bull"
                />
              )}
              {i !== index && (
                <span className="absolute inset-0 bg-white/20 transition-colors group-hover:bg-white/40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute bottom-8 right-24 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:bottom-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute bottom-8 right-10 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:bottom-10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  );
}
