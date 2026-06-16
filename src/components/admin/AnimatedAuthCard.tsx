"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function AnimatedAuthCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-black shadow-[0_8px_60px_rgba(0,0,0,0.4)] sm:p-10"
    >
      {/* Animated dark shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-black/90 blur-[70px]"
          animate={{ x: [0, 20, -10, 0], y: [0, 15, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-black/80 blur-[70px]"
          animate={{ x: [0, -15, 10, 0], y: [0, -10, 15, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
