"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { TEMPLATE_CATEGORIES, formatNaira } from "@/lib/constants";
import type { Template } from "@/types/database";

interface TemplatesGridProps {
  templates: Partial<Template>[];
}

export default function TemplatesGrid({ templates }: TemplatesGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        activeCategory === "All" || template.category === activeCategory;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        template.title?.toLowerCase().includes(query) ||
        template.description?.toLowerCase().includes(query) ||
        template.features?.some((f) => f.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [templates, activeCategory, search]);

  return (
    <div>
      {/* Filters + Search */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "border-white bg-white text-black"
                  : "border-border text-text-secondary hover:border-white hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-sm lg:w-72">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-full border border-border bg-background-secondary py-3 pl-11 pr-10 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background-secondary"
              >
                <Link href={`/templates/${template.slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    {template.featured_image ? (
                      <Image
                        src={template.featured_image}
                        alt={template.title || "Template"}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-secondary">
                        <span className="text-sm">Preview coming soon</span>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                      {template.category}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link href={`/templates/${template.slug}`}>
                    <h3 className="text-xl font-semibold transition-colors hover:text-text-secondary">
                      {template.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-text-secondary">{template.description}</p>

                  {template.features && template.features.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {template.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                          <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold">
                      {formatNaira(template.price_min, template.price_max)}
                    </span>
                    <Link
                      href={`/templates/${template.slug}`}
                      className="text-sm font-semibold text-white transition-colors hover:text-text-secondary"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-semibold">No templates found</p>
          <p className="text-sm text-text-secondary">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
