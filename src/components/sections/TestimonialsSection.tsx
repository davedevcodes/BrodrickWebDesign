"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import type { Testimonial } from "@/types/database";

interface TestimonialsSectionProps {
  testimonials: Partial<Testimonial>[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-background-secondary/30">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by ambitious brands"
          description="Don't just take our word for it — here's what our clients have to say about working with us."
        />

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-background p-8"
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl text-white/20" />

                <p className="flex-1 text-base leading-relaxed text-text-secondary">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                  ))}
                </div>

                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                    {testimonial.client_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.client_name}</p>
                    <p className="text-xs text-text-secondary">
                      {testimonial.client_role}
                      {testimonial.client_company ? `, ${testimonial.client_company}` : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
