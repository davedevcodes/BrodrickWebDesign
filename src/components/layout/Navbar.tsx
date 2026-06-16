"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Settings } from "@/types/database";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/templates", label: "Templates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute bg-transparent top-0 z-50 w-full">
      <div className="container-custom pt-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-16 items-center justify-between rounded-full border border-black/5 bg-white px-5 shadow-[0_2px_24px_rgba(0,0,0,0.08)] sm:px-6"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt={settings.agency_name}
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/60 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="hidden md:inline-block">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
            >
              Start Your Project
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </motion.span>
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black md:hidden"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_2px_24px_rgba(0,0,0,0.08)]">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-black/70 transition-colors hover:bg-black/[0.04] hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
                >
                  Start Your Project
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
