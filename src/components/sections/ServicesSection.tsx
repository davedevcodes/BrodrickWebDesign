"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { getServiceIcon } from "@/lib/icons";
import type { ServiceCategory } from "@/types/database";

interface ServicesSectionProps {
  services: Pick<ServiceCategory, "name" | "slug" | "description" | "icon">[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Do"
          title="Services built to grow your business"
          description="From first impression to final checkout, we design and build every digital touchpoint your brand needs to compete and win."
        />

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-background-secondary p-8"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/0 blur-2xl transition-colors duration-500 group-hover:bg-white/[0.06]" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-black text-xl transition-colors duration-300 group-hover:border-white">
                  <FontAwesomeIcon icon={getServiceIcon(service.icon)} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  Get started
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
