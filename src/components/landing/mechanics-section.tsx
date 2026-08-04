"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MECHANICS_SECTIONS } from "@/lib/mechanics-content";

export function MechanicsSection() {
  return (
    <section id="how-does-it-work" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            So how does any of this actually work?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[rgb(var(--muted))]">
            Most platforms explain themselves in adjectives: fast, secure,
            seamless. Here&apos;s the version with actual mechanics in it.
          </p>
        </motion.div>

        {/* Article body */}
        <div className="mt-14 flex flex-col gap-12">
          {MECHANICS_SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-bull">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
                  {section.heading}
                </h3>
              </div>

              <div className="mt-4 flex flex-col gap-4 border-l border-bull/25 pl-6">
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-justify leading-relaxed text-[rgb(var(--muted))]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 rounded-2xl glass-surface glass-border p-6 sm:p-8"
        >
          <p className="text-balance text-lg font-semibold text-[rgb(var(--foreground))]">
            That&apos;s the whole mechanism, no hidden steps.
          </p>
          <p className="mt-2 leading-relaxed text-[rgb(var(--muted))]">
            If something here isn&apos;t clear, the FAQ below covers the
            questions people ask most often.
          </p>
          <Link
            href="/register"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-bull px-6 py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.02]"
          >
            Create Your Account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}