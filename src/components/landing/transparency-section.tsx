"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FEE_ROWS, NEVER_PAY } from "@/lib/fees-data";

export function TransparencySection() {
  return (
    <section id="transparency" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
            Transparency
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Every fee, listed. Nothing hidden.
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
            Most platforms bury their pricing three menus deep. We didn&apos;t
            think that was worth doing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Fee table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl glass-surface glass-border"
          >
            <div className="divide-y divide-white/[0.06]">
              {FEE_ROWS.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bull/10">
                      <row.icon className="h-4 w-4 text-bull" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                        {row.label}
                      </p>
                      {row.note && (
                        <p className="text-xs text-[rgb(var(--muted))]">{row.note}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar: what you'll never pay + photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <div className="overflow-hidden rounded-2xl glass-surface glass-border">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1649209979970-f01d950cc5ed?auto=format&fit=crop&w=1000&q=80"
                  alt="A calculator on a wooden desk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))]">
                  What you&apos;ll never pay
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {NEVER_PAY.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bull" />
                      <span className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
