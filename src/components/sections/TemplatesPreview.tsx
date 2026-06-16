"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { formatNaira } from "@/lib/constants";
import type { Template } from "@/types/database";

interface TemplatesPreviewProps {
  templates: Partial<Template>[];
}

export default function TemplatesPreview({ templates }: TemplatesPreviewProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Website Templates"
            title="Launch faster with a ready-made design"
            description="Choose a template as your starting point — we'll customize it to fit your brand and business."
            align="left"
            className="sm:max-w-xl"
          />
          <Link href="/templates" className="hidden sm:block">
            <Button variant="secondary">
              Browse templates
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Button>
          </Link>
        </div>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {templates.map((template) => (
            <StaggerItem key={template.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background-secondary"
              >
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

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{template.title}</h3>
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
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/templates">
            <Button variant="secondary">
              Browse templates
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
