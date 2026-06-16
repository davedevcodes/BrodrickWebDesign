"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = { status: "idle" };

const services = [
  "Business Website Design",
  "E-Commerce Website",
  "Landing Page",
  "Website Redesign",
  "SEO Optimization",
  "Website Maintenance",
  "Something else",
];

const budgets = [
  "Under ₦300,000",
  "₦300,000 – ₦750,000",
  "₦750,000 – ₦1,500,000",
  "₦1,500,000+",
  "Not sure yet",
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-secondary">
            Phone Number <span className="text-text-secondary/60">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+234..."
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-secondary">
            Company / Business <span className="text-text-secondary/60">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your company name"
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-text-secondary">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-text-secondary">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, goals, and timeline..."
          className="w-full resize-none rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending..." : "Send Message"}
        {!isPending && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
      </motion.button>

      {state.status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white"
        >
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 text-base" />
          <span>{state.message}</span>
        </motion.div>
      )}

      {state.status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300"
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 text-base" />
          <span>{state.message}</span>
        </motion.div>
      )}
    </form>
  );
}
