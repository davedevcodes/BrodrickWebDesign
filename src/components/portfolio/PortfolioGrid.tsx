"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@/types/database";

interface PortfolioGridProps {
  projects: Partial<Project>[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title?.toLowerCase().includes(query) ||
        project.client_name?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tech_stack?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search]);

  return (
    <div>
      {/* Filters + Search */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((category) => (
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
            placeholder="Search projects..."
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
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/portfolio/${project.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background-secondary"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    {project.featured_image ? (
                      <Image
                        src={project.featured_image}
                        alt={project.title || "Project"}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-secondary">
                        <span className="text-sm">Image coming soon</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                    {project.client_name && (
                      <p className="mt-1 text-sm text-text-secondary">{project.client_name}</p>
                    )}
                    <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
                      {project.description}
                    </p>

                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech_stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-semibold">No projects found</p>
          <p className="text-sm text-text-secondary">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
