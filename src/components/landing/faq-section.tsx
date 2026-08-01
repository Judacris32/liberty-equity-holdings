"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FaqSection() {
  const [openId, setOpenId] = React.useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
            Questions
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            Things people actually ask
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
            No spin, just straight answers — including the ones that don&apos;t
            flatter us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl glass-surface glass-border"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={i > 0 ? "border-t border-white/[0.06]" : ""}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-[rgb(var(--foreground))] sm:text-base">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-[rgb(var(--muted))]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[rgb(var(--muted))]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
