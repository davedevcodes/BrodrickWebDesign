"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-black">
      {/* Background: dark animated shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large soft blob - top right */}
        <motion.div
          className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-black/90 blur-[90px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 30, -10, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium blob - bottom left */}
        <motion.div
          className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-black/80 blur-[100px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.94, 1.05, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating ring */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating squares */}
        <motion.div
          className="absolute right-[12%] top-[20%] h-16 w-16 rounded-2xl bg-black"
          animate={{
            y: [0, -24, 0],
            rotate: [0, 12, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[10%] top-[55%] h-10 w-10 rounded-xl bg-black/80"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-[20%] bottom-[15%] h-6 w-6 rounded-full bg-black"
          animate={{
            y: [0, -16, 0],
            x: [0, 12, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
          </span>
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
        >
          We design websites
          <br />
          that build empires
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-lg text-black/60 sm:text-xl"
        >
          A premium web development agency crafting fast, conversion-focused
          websites and digital products for ambitious brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
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
          <Link href="/portfolio">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:border-black"
            >
              View Portfolio
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-black/20 p-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
