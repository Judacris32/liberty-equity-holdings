"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Eye } from "lucide-react";

const VALUES = [
  {
    icon: Eye,
    title: "Clarity over hype",
    description: "If a feature needs marketing spin to sound good, it probably isn't good.",
  },
  {
    icon: ShieldCheck,
    title: "Security by default",
    description: "Not a checkbox we added later — the architecture assumes it from the start.",
  },
  {
    icon: Sparkles,
    title: "No guaranteed returns",
    description: "Ever. Anyone promising you outcomes in trading is telling you what you want to hear.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28">
  <div className="mx-auto max-w-6xl px-6">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
        About Liberty Equity Holdings
      </span>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
        Built on a simple promise: you deserve absolute clarity and guaranteed returns on your capital.
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
      {/* Copy column */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-10 lg:col-span-7"
      >
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
            What we do
          </h3>
          <p className="mt-3 text-justify leading-relaxed text-[rgb(var(--muted))]">
            At Liberty Equity Holdings, we empower your financial journey by managing secure investments across crypto, forex, and equity plans. Through our advanced trading terminal, pricing updates in real time and execution happens instantly. Every position and profit tier is transparently logged, ensuring you always know where your wealth stands without navigating confusing menus or hidden hurdles.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
            Why we exist
          </h3>
          <div className="mt-3 flex flex-col gap-4 text-[rgb(var(--muted))]">
            <p className="text-justify leading-relaxed">
              We know that traditional platforms often demand your money before earning your trust, hiding crucial fee structures and risks behind vague terminology. We established Liberty Equity Holdings to do things differently. Every protective measure we implement—from strict data security to verified asset allocations—is designed to safeguard your principal and deliver the dependable results you expect.
            </p>
            <p className="text-justify leading-relaxed">
              Our commitment is straightforward: to provide a reliable, honest environment where your investments grow safely, backed by structured plans designed for your long-term peace of mind.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
            What we believe
          </h3>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:gap-6">
            {VALUES.map((value) => (
              <div key={value.title} className="flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bull/10">
                  <value.icon className="h-3.5 w-3.5 text-bull" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[rgb(var(--foreground))]">
                  {value.title}
                </p>
                <p className="mt-1 text-justify text-xs leading-relaxed text-[rgb(var(--muted))]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="border-l-2 border-bull/40 pl-4 text-sm italic text-[rgb(var(--muted))]">
          Investing in value. Building legacy.
        </p>
      </motion.div>

      {/* Photo column */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="lg:sticky lg:top-28 lg:col-span-5"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl glass-border border">
          <Image
            src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?auto=format&fit=crop&w=1000&q=80"
            alt="Two people shaking hands over a wooden table"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  </div>
    </section>
  );
}
