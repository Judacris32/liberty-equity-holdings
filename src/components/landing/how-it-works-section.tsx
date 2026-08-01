"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  TRADING_STYLES,
  POSITION_SIZES,
  MARKET_OPTIONS,
} from "@/lib/how-it-works-data";

const STEPS = [
  { number: "01", label: "Choose your style" },
  { number: "02", label: "Size your position" },
  { number: "03", label: "Pick your market" },
];

export function HowItWorksSection() {
  const [styleId, setStyleId] = React.useState(TRADING_STYLES[1].id);
  const [sizeId, setSizeId] = React.useState(POSITION_SIZES[1].id);
  const [marketId, setMarketId] = React.useState(MARKET_OPTIONS[0].id);

  const selectedStyle = TRADING_STYLES.find((s) => s.id === styleId)!;
  const selectedSize = POSITION_SIZES.find((s) => s.id === sizeId)!;
  const selectedMarket = MARKET_OPTIONS.find((m) => m.id === marketId)!;

  // Helper to extract a numeric value from position size (e.g., "$1,000" -> 1000)
  // and calculate a simulated guaranteed return/interest at 50%
  const calculateGuaranteedReturn = (label: string) => {
    const numericValue = parseFloat(label.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) return null;
    
    // Updated to 50% guaranteed interest/return calculation
    const interestRate = 0.50; 
    const calculatedReturn = numericValue * (1 + interestRate);

    return {
      principal: numericValue,
      total: calculatedReturn.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    };
  };

  const returnDetails = calculateGuaranteedReturn(selectedSize.label);

  return (
    <section id="how-it-works" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
            Getting started
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            A clear path from setup to execution
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
            Three simple choices — how you trade, how much, and where —
            before you ever place an order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div className="flex flex-col gap-10">
            {/* Step 1: Style — photo cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <StepLabel step={STEPS[0]} />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {TRADING_STYLES.map((style) => {
                  const active = style.id === styleId;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setStyleId(style.id)}
                      className={`group overflow-hidden rounded-2xl border text-left transition-colors ${
                        active
                          ? "border-bull/40"
                          : "glass-border hover:border-white/20"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={style.image}
                          alt={style.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                            active ? "" : "opacity-80"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div
                          className={`absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-sm ${
                            active ? "bg-bull/20" : "bg-white/10"
                          }`}
                        >
                          <style.icon
                            className={`h-4 w-4 ${active ? "text-bull" : "text-white"}`}
                          />
                        </div>
                        {active && (
                          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-bull">
                            <Check className="h-3.5 w-3.5 text-[#07090e]" />
                          </div>
                        )}
                      </div>
                      <div className="glass-surface p-4">
                        <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                          {style.label}
                        </p>
                        <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
                          {style.horizon}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">
                          {style.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 2: Size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <StepLabel step={STEPS[1]} />
              <div className="mt-4 flex flex-wrap gap-3">
                {POSITION_SIZES.map((size) => {
                  const active = size.id === sizeId;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSizeId(size.id)}
                      className={`rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "border-bull/40 bg-bull/[0.08] text-bull"
                          : "glass-border glass-surface text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-[rgb(var(--muted))]">
                Just a starting point, you can size every position
                individually once you&apos;re in the terminal.
              </p>
            </motion.div>

            {/* Step 3: Market — photo cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <StepLabel step={STEPS[2]} />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {MARKET_OPTIONS.map((market) => {
                  const active = market.id === marketId;
                  return (
                    <button
                      key={market.id}
                      onClick={() => setMarketId(market.id)}
                      className={`group overflow-hidden rounded-2xl border text-left transition-colors ${
                        active
                          ? "border-bull/40"
                          : "glass-border hover:border-white/20"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={market.image}
                          alt={market.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                            active ? "" : "opacity-80"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div
                          className={`absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-sm ${
                            active ? "bg-bull/20" : "bg-white/10"
                          }`}
                        >
                          <market.icon
                            className={`h-4 w-4 ${active ? "text-bull" : "text-white"}`}
                          />
                        </div>
                        {active && (
                          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-bull">
                            <Check className="h-3.5 w-3.5 text-[#07090e]" />
                          </div>
                        )}
                      </div>
                      <div className="glass-surface p-4">
                        <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                          {market.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">
                          {market.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Live summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="h-fit rounded-2xl glass-surface glass-border p-6 lg:sticky lg:top-24"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))]">
              Your setup
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <SummaryRow label="Style">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedStyle.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold text-[rgb(var(--foreground))]"
                  >
                    {selectedStyle.label}
                  </motion.span>
                </AnimatePresence>
              </SummaryRow>

              <SummaryRow label="Position Size">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedSize.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold text-[rgb(var(--foreground))]"
                  >
                    {selectedSize.label}
                  </motion.span>
                </AnimatePresence>
              </SummaryRow>

              <SummaryRow label="Market">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedMarket.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold text-[rgb(var(--foreground))]"
                  >
                    {selectedMarket.label}
                  </motion.span>
                </AnimatePresence>
              </SummaryRow>

              {/* Added Guaranteed Interest / Return Row at 50% */}
              {returnDetails && (
                <SummaryRow label="Guaranteed Return (50%)">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedSize.id + "-return"}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-semibold text-bull"
                    >
                      {returnDetails.total}
                    </motion.span>
                  </AnimatePresence>
                </SummaryRow>
              )}
            </div>

            <div className="my-5 border-t glass-border" />

            <div className="flex items-start gap-2 text-xs leading-relaxed text-[rgb(var(--muted))]">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bull" />
              Includes 50% guaranteed interest calculation, carrying
              your preferences and projections into the terminal.
            </div>

            <Link
              href="/register"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.02]"
            >
              Create Your Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ step }: { step: { number: string; label: string } }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-bull">{step.number}</span>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
        {step.label}
      </h3>
      <span className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[rgb(var(--muted))]">{label}</span>
      {children}
    </div>
  );
}