"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPenRuler,
  faCode,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: faComments,
    title: "Discovery & Strategy",
    description:
      "We start by understanding your business, goals, and audience to define the right strategy for your project.",
  },
  {
    icon: faPenRuler,
    title: "Design",
    description:
      "We craft clean, modern designs tailored to your brand — focused on clarity, conversion, and visual impact.",
  },
  {
    icon: faCode,
    title: "Development",
    description:
      "Our engineers build fast, secure, and scalable websites using modern frameworks and best practices.",
  },
  {
    icon: faRocket,
    title: "Launch & Support",
    description:
      "We deploy your project, optimize for performance and SEO, and provide ongoing support as you grow.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Process"
          title="How we bring your project to life"
          description="A clear, collaborative process designed to keep you informed and your project on track from day one."
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-4 bg-background p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background-secondary text-lg">
                <FontAwesomeIcon icon={step.icon} />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
