"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import type { Project } from "@/types/database";

interface PortfolioPreviewProps {
  projects: Partial<Project>[];
}

export default function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  return (
    <section className="section-padding bg-background-secondary/30">
      <div className="container-custom">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title="Selected projects"
            description="A glimpse at the brands we've helped design, build, and launch."
            align="left"
            className="sm:max-w-xl"
          />
          <Link href="/portfolio" className="hidden sm:block">
            <Button variant="secondary">
              View all work
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Button>
          </Link>
        </div>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/portfolio/${project.slug}`} className="block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden rounded-3xl border border-border bg-background-secondary"
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

                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/portfolio">
            <Button variant="secondary">
              View all work
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
