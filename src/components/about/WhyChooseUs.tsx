"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FadeUp from "@/components/animations/FadeUp";

const reasons = [
  "Premium design tailored to your brand, not templated clones",
  "Built on fast, modern technology (Next.js, not bloated builders)",
  "SEO and performance optimized from day one",
  "Clear pricing with no hidden costs",
  "Ongoing support after launch — we don't disappear",
  "Direct communication with the people building your project",
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Why Choose Us
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Premium quality, without the agency markup
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl text-base text-text-secondary sm:text-lg">
              We combine the design quality of a top-tier agency with the speed
              and flexibility of a small, focused team. The result: better
              websites, delivered faster, at a fair price.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link href="/contact" className="mt-8 inline-block">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-text-secondary"
              >
                Start Your Project
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </motion.span>
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-background-secondary p-5"
            >
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FontAwesomeIcon icon={faCheck} className="text-xs" />
              </div>
              <p className="text-sm leading-relaxed sm:text-base">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
