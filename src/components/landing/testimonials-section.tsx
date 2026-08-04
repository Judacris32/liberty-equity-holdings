"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Info } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

export function TestimonialsSection() {
  return (
    <section id="feedback" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
            Global Investor Feedback
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Verified reviews from our international community
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.figure
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col rounded-2xl glass-surface glass-border p-6 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-3.5 w-3.5 ${
                      starIndex < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-[rgb(var(--muted))]/30"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[rgb(var(--muted))]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t glass-border pt-5">
                {/* Replaced initials bubble with Next.js Image profile picture */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[rgb(var(--muted))]">
                    {testimonial.role} &middot; {testimonial.location}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}