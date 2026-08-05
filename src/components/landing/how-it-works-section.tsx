"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { START_STEPS } from "@/lib/start-steps";

export function HowItWorksSection() {
  return (
    <section id="staking-plans" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Pick a plan that fits your growth goals
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
            Whether you are just getting your feet wet or looking to scale up your portfolio, we have a flexible tier built to put your capital to work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {START_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group flex flex-col overflow-hidden rounded-2xl glass-surface glass-border transition-colors hover:bg-white/[0.02]"
            >
              {/* Image header with plan id badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <span className="absolute left-4 top-4 font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
                  {step.id}
                </span>

                <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-bull/20 backdrop-blur-sm">
                  <step.icon className="h-4 w-4 text-bull" />
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-medium text-[rgb(var(--foreground))]">
                  {step.title}
                </h3>
                
                {/* Price range */}
                <div className="mt-2 text-2xl font-bold tracking-tight text-bull">
                  {step.description}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                  {step.points.map((point) => (
                    <div key={point} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-bull" />
                      <span className="text-xs leading-relaxed text-[rgb(var(--muted))]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Uniform Button with hover transition */}
                <Link
                  href={step.cta.href}
                  className="group/btn mt-8 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold glass-surface glass-border border text-[rgb(var(--foreground))] transition-all duration-300 hover:bg-bull hover:text-[#07090e] hover:border-bull hover:shadow-glow"
                >
                  <span>{step.cta.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}