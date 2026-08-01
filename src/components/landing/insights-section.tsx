"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { INSIGHTS } from "@/lib/insights";

export function InsightsSection() {
  return (
    <section id="insights" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              From the desk
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
              A few things worth reading before your next trade
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[rgb(var(--muted))]">
            Plain-language notes on how markets actually behave, written
            for people who trade, not people who study it for a living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link
                href={`/insights/${insight.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl glass-surface glass-border transition-colors hover:bg-white/[0.02]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={insight.image}
                    alt={insight.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {insight.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold leading-snug text-[rgb(var(--foreground))]">
                    {insight.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {insight.excerpt}
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t glass-border pt-4">
                    <span className="flex items-center gap-3 text-xs text-[rgb(var(--muted))]">
                      <span>By {insight.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {insight.readTime}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-bull opacity-0 transition-opacity group-hover:opacity-100">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
