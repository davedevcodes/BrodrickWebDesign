"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import FadeUp from "@/components/animations/FadeUp";
import type { Settings } from "@/types/database";

export default function ContactCTA({ settings }: { settings: Settings }) {
  const whatsappLink = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <section className="py-24 sm:py-32">
      <div className="container-custom">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-white px-6 py-20 text-center text-black sm:px-16">
          {/* Animated dark shapes */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-black/90 blur-[80px]"
              animate={{ x: [0, 30, -10, 0], y: [0, 20, -10, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-black/80 blur-[90px]"
              animate={{ x: [0, -25, 15, 0], y: [0, -15, 10, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[15%] top-[20%] h-12 w-12 rounded-2xl bg-black"
              animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[12%] bottom-[18%] h-8 w-8 rounded-full bg-black/80"
              animate={{ y: [0, 14, 0], x: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                Let&apos;s Build Something Great
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Ready to elevate your online presence?
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="max-w-xl text-base text-black/60 sm:text-lg">
                Tell us about your project and we&apos;ll get back to you within 24 hours
                with next steps and a free consultation.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/80"
                  >
                    Start Your Project
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </motion.span>
                </Link>
                {whatsappLink && (
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:border-black"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                      Chat on WhatsApp
                    </motion.span>
                  </Link>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
