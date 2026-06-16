"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { submitTemplateInquiry, type InquiryFormState } from "@/app/(site)/templates/[slug]/actions";

const initialState: InquiryFormState = { status: "idle" };

export default function TemplateInquiryForm({
  templateId,
  templateTitle,
}: {
  templateId: string;
  templateTitle: string;
}) {
  const [state, formAction, isPending] = useActionState(submitTemplateInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="rounded-3xl border border-border bg-background-secondary p-8">
      <h3 className="text-xl font-semibold">Select this template</h3>
      <p className="mt-2 text-sm text-text-secondary">
        Tell us a bit about your project and we&apos;ll reach out to discuss customizing{" "}
        <span className="text-white">{templateTitle}</span> for your brand.
      </p>

      <form ref={formRef} action={formAction} className="mt-6 space-y-4">
        <input type="hidden" name="templateId" value={templateId} />

        <div>
          <label htmlFor="inquiry-name" className="mb-2 block text-sm font-medium text-text-secondary">
            Full Name
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="inquiry-email" className="mb-2 block text-sm font-medium text-text-secondary">
            Email Address
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="mb-2 block text-sm font-medium text-text-secondary">
            Phone Number <span className="text-text-secondary/60">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            placeholder="+234..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="inquiry-message" className="mb-2 block text-sm font-medium text-text-secondary">
            Message <span className="text-text-secondary/60">(optional)</span>
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            rows={3}
            placeholder="Anything specific you'd like us to know..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Select This Template"}
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
    </div>
  );
}
