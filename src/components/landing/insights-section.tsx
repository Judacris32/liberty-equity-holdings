"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { INSIGHTS } from "@/lib/insights";

export function InsightsSection() {
  return (
    <section id="insights" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Actionable income ideas for shifting markets
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[rgb(var(--muted))]">
            Bottom-up analysis on mispriced convertibles, digital credits, and rare resources to help you uncover unique yield opportunities.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="w-full max-w-xl"
            >
              <Link
                href={`/insights/${insight.id}`}
                className="group flex w-full flex-col overflow-hidden rounded-2xl glass-surface glass-border transition-colors hover:bg-white/[0.02]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={insight.image}
                    alt={insight.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {insight.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold leading-snug text-[rgb(var(--foreground))]">
                    {insight.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {insight.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
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