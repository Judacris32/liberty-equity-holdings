"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1566866856854-a0b3d69a62c0?auto=format&fit=crop&w=2000&q=80"
              alt="City skyline of illuminated buildings at night"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/85 via-[#07090e]/90 to-[#07090e]/95" />
          </div>

          <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-24">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              Ready when you are
            </span>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next trade is one account away.
            </h2>
            <p className="mt-5 max-w-lg text-balance leading-relaxed text-white/70">
              No hidden fees, no guaranteed promises — just a platform built
              to be honest with you from the first click.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-full bg-bull px-7 py-3.5 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
              >
                Create Your Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
