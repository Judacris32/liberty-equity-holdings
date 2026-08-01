"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SECURITY_FEATURES } from "@/lib/security-features";

const CHECKLIST = ["No plaintext secrets", "Reviewed line by line", "Nothing left to chance"];

export function SecuritySection() {
  return (
    <section id="security" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Asymmetric header: heading left, supporting copy + checklist right */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              Security, not marketing
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl lg:text-[2.75rem]">
              We don&apos;t just say secure.{" "}
              <span className="text-[rgb(var(--emphasis))]">We build like it.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <p className="text-balance leading-relaxed text-[rgb(var(--muted))]">
              Every layer here exists because we thought carefully about how
              it could fail — not because it reads well in a pitch deck.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {CHECKLIST.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-[rgb(var(--muted))]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-bull" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl glass-surface glass-border transition-colors hover:bg-white/[0.02]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bull/15 backdrop-blur-sm">
                  <feature.icon className="h-4 w-4 text-bull" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
