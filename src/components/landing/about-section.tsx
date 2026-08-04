"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Target, Flag, Sparkles, ShieldCheck, Eye } from "lucide-react";

const PILLARS = [
  {
    id: "value",
    icon: Compass,
    label: "Value",
    body: "Clarity, access, and disciplined capital allocation. We cut noise, surface real market opportunities, and help clients put money to work without unnecessary friction or complexity.",
  },
  {
    id: "goal",
    icon: Target,
    label: "Goal",
    body: "Build lasting client wealth through focused equity strategies, reliable market insight, and consistent execution across cycles.",
  },
  {
    id: "mission",
    icon: Flag,
    label: "Mission",
    body: "Deliver accessible, high-integrity equity holdings and market tools so every client can participate in long-term value creation with confidence and control.",
  },
];

const PRINCIPLES = [
  {
    icon: Eye,
    title: "Absolute Transparency",
    description: "No misleading claims or hidden conditions. just clear, verifiable data so you always know where your capital stands.",
  },
  {
    icon: ShieldCheck,
    title: "Security by Default",
    description: "Built on robust architecture and multi-layered protocols from the ground up to protect your assets and data at every level.",
  },
  {
    icon: Sparkles,
    title: "No Guaranteed Returns",
    description: "Real markets carry risk. We provide a secure, transparent environment and structured options designed to put your capital to work reliably.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header + intro, side by side with photo */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              About Liberty Equity Holdings
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
              A modern investment platform built on clear exposure and
              transparent holdings.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[rgb(var(--muted))]">
              Liberty Equity Holdings is focused on equities, market access,
              and portfolio growth. We give individuals and partners clear
              exposure to public markets with straightforward tools and
              transparent holdings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
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

        {/* Value / Goal / Mission */}
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl glass-surface glass-border p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bull/10">
                <pillar.icon className="h-4 w-4 text-bull" />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
                {pillar.label}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[rgb(var(--muted))]">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Operating principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-16"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
            How we operate
          </h3>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-8">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bull/10">
                  <principle.icon className="h-3.5 w-3.5 text-bull" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[rgb(var(--foreground))]">
                  {principle.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--muted))]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 border-l-2 border-bull/40 pl-4 text-sm italic text-[rgb(var(--muted))]"
        >
          Investing in value. Building legacy.
        </motion.p>
      </div>
    </section>
  );
}
