"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MECHANICS_POINTS } from "@/lib/mechanics-content";

export function MechanicsSection() {
  return (
    <section id="how-does-it-work" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Left: pinned header on desktop */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              Under the hood
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl lg:text-[2.75rem]">
              So how does any of this actually work?
            </h2>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-[rgb(var(--muted))]">
              Five things worth knowing before you trade here: where prices
              come from, what happens to an order, and how your money is
              tracked.
            </p>

            {/* Index of the five points (desktop) */}
            <ol className="mt-10 hidden flex-col gap-2.5 border-l glass-border pl-5 lg:flex">
              {MECHANICS_POINTS.map((point, i) => (
                <li key={point.id}>
                  <a
                    href={`#mechanics-${point.id}`}
                    className="group flex items-baseline gap-3 text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
                  >
                    <span className="font-mono text-[11px] text-bull">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {point.heading}
                  </a>
                </li>
              ))}
            </ol>

            <Link
              href="/markets"
              className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--foreground))] underline-offset-4 hover:underline"
            >
              See the full fee breakdown
              <ArrowUpRight className="h-4 w-4 text-bull transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Right: the five points */}
        <ol className="flex flex-col">
          {MECHANICS_POINTS.map((point, i) => (
            <motion.li
              key={point.id}
              id={`mechanics-${point.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="scroll-mt-28 border-t glass-border py-10 first:border-t-0 first:pt-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <span className="font-mono text-xs text-bull">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-2xl">
                    {point.heading}
                  </h3>
                </div>

                <div className="shrink-0 rounded-2xl glass-surface glass-border border px-4 py-3 text-right">
                  <p className="font-mono text-xl font-semibold leading-none text-[rgb(var(--foreground))] sm:text-2xl">
                    {point.stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">
                    {point.stat.label}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-pretty text-lg font-medium leading-snug text-[rgb(var(--foreground))]">
                {point.takeaway}
              </p>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-[rgb(var(--muted))]">
                {point.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
