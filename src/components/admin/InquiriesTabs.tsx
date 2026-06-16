"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash, faSpinner, faChevronDown, faEnvelope,
  faCheck, faReply,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { updateInquiryStatus, deleteInquiry } from "@/app/admin/(dashboard)/inquiries/actions";
import type { ContactSubmission } from "@/types/database";
import type { TemplateInquiryWithTemplate } from "@/lib/data/inquiries";

interface InquiriesTabsProps {
  contacts: ContactSubmission[];
  templateInquiries: TemplateInquiryWithTemplate[];
  initialTab?: "contacts" | "templates";
}

const statusStyles: Record<string, string> = {
  new: "bg-white text-black",
  read: "border border-border text-text-secondary",
  replied: "border border-white/30 text-white",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function InquiriesTabs({
  contacts,
  templateInquiries,
  initialTab = "contacts",
}: InquiriesTabsProps) {
  const [tab, setTab] = useState<"contacts" | "templates">(initialTab);
  const [contactItems, setContactItems] = useState(contacts);
  const [templateItems, setTemplateItems] = useState(templateInquiries);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (kind: "contact" | "template", id: string, status: "new" | "read" | "replied") => {
    startTransition(async () => {
      await updateInquiryStatus(kind, id, status);
      if (kind === "contact") {
        setContactItems((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      } else {
        setTemplateItems((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
      }
    });
  };

  const handleDelete = (kind: "contact" | "template", id: string) => {
    setPendingId(id);
    startTransition(async () => {
      await deleteInquiry(kind, id);
      if (kind === "contact") {
        setContactItems((prev) => prev.filter((c) => c.id !== id));
      } else {
        setTemplateItems((prev) => prev.filter((t) => t.id !== id));
      }
      setPendingId(null);
      setConfirmId(null);
    });
  };

  const newContactCount = contactItems.filter((c) => c.status === "new").length;
  const newTemplateCount = templateItems.filter((t) => t.status === "new").length;

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setTab("contacts")}
          className={clsx(
            "relative px-4 py-3 text-sm font-medium transition-colors",
            tab === "contacts" ? "text-white" : "text-text-secondary hover:text-white"
          )}
        >
          Contact Requests
          {newContactCount > 0 && (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
              {newContactCount}
            </span>
          )}
          {tab === "contacts" && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-px bg-white" />
          )}
        </button>
        <button
          onClick={() => setTab("templates")}
          className={clsx(
            "relative px-4 py-3 text-sm font-medium transition-colors",
            tab === "templates" ? "text-white" : "text-text-secondary hover:text-white"
          )}
        >
          Template Inquiries
          {newTemplateCount > 0 && (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
              {newTemplateCount}
            </span>
          )}
          {tab === "templates" && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-px bg-white" />
          )}
        </button>
      </div>

      {/* Contact Requests */}
      {tab === "contacts" && (
        <div className="mt-6 space-y-3">
          {contactItems.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background-secondary p-12 text-center">
              <p className="text-lg font-semibold">No contact requests yet</p>
              <p className="mt-2 text-sm text-text-secondary">
                Submissions from the contact form will appear here.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {contactItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-border bg-background-secondary"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="truncate font-medium">{item.name}</p>
                        <span className={clsx("rounded-full px-2.5 py-0.5 text-xs font-semibold", statusStyles[item.status])}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-text-secondary">
                        {item.service_needed || item.email} · {formatDate(item.created_at)}
                      </p>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={clsx("text-xs text-text-secondary transition-transform", expandedId === item.id && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-border"
                      >
                        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-text-secondary">Email</p>
                            <p className="text-sm">{item.email}</p>
                          </div>
                          {item.phone && (
                            <div>
                              <p className="text-xs text-text-secondary">Phone</p>
                              <p className="text-sm">{item.phone}</p>
                            </div>
                          )}
                          {item.company && (
                            <div>
                              <p className="text-xs text-text-secondary">Company</p>
                              <p className="text-sm">{item.company}</p>
                            </div>
                          )}
                          {item.service_needed && (
                            <div>
                              <p className="text-xs text-text-secondary">Service Needed</p>
                              <p className="text-sm">{item.service_needed}</p>
                            </div>
                          )}
                          {item.budget && (
                            <div>
                              <p className="text-xs text-text-secondary">Budget</p>
                              <p className="text-sm">{item.budget}</p>
                            </div>
                          )}
                          <div className="sm:col-span-2">
                            <p className="text-xs text-text-secondary">Message</p>
                            <p className="mt-1 text-sm leading-relaxed">{item.message}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
                          {item.status !== "read" && (
                            <button
                              onClick={() => handleStatusChange("contact", item.id, "read")}
                              disabled={isPending}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-white disabled:opacity-50"
                            >
                              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                              Mark as Read
                            </button>
                          )}
                          {item.status !== "replied" && (
                            <button
                              onClick={() => handleStatusChange("contact", item.id, "replied")}
                              disabled={isPending}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-white disabled:opacity-50"
                            >
                              <FontAwesomeIcon icon={faReply} className="text-xs" />
                              Mark as Replied
                            </button>
                          )}
                          <a
                            href={`mailto:${item.email}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-text-secondary"
                          >
                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                            Reply via Email
                          </a>

                          <div className="ml-auto">
                            {confirmId === item.id ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDelete("contact", item.id)}
                                  disabled={isPending && pendingId === item.id}
                                  className="rounded-full bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                                >
                                  {isPending && pendingId === item.id ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                  ) : "Confirm"}
                                </button>
                                <button
                                  onClick={() => setConfirmId(null)}
                                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmId(item.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-red-300 transition-colors hover:border-red-400"
                                aria-label="Delete"
                              >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}

      {/* Template Inquiries */}
      {tab === "templates" && (
        <div className="mt-6 space-y-3">
          {templateItems.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background-secondary p-12 text-center">
              <p className="text-lg font-semibold">No template inquiries yet</p>
              <p className="mt-2 text-sm text-text-secondary">
                Requests from the &quot;Select this template&quot; form will appear here.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {templateItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-border bg-background-secondary"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="truncate font-medium">{item.name}</p>
                        <span className={clsx("rounded-full px-2.5 py-0.5 text-xs font-semibold", statusStyles[item.status])}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-text-secondary">
                        {item.template_title || "Template"} · {formatDate(item.created_at)}
                      </p>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={clsx("text-xs text-text-secondary transition-transform", expandedId === item.id && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-border"
                      >
                        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-text-secondary">Email</p>
                            <p className="text-sm">{item.email}</p>
                          </div>
                          {item.phone && (
                            <div>
                              <p className="text-xs text-text-secondary">Phone</p>
                              <p className="text-sm">{item.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-text-secondary">Template</p>
                            <p className="text-sm">{item.template_title || "—"}</p>
                          </div>
                          {item.message && (
                            <div className="sm:col-span-2">
                              <p className="text-xs text-text-secondary">Message</p>
                              <p className="mt-1 text-sm leading-relaxed">{item.message}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
                          {item.status !== "read" && (
                            <button
                              onClick={() => handleStatusChange("template", item.id, "read")}
                              disabled={isPending}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-white disabled:opacity-50"
                            >
                              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                              Mark as Read
                            </button>
                          )}
                          {item.status !== "replied" && (
                            <button
                              onClick={() => handleStatusChange("template", item.id, "replied")}
                              disabled={isPending}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-white disabled:opacity-50"
                            >
                              <FontAwesomeIcon icon={faReply} className="text-xs" />
                              Mark as Replied
                            </button>
                          )}
                          <a
                            href={`mailto:${item.email}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-text-secondary"
                          >
                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                            Reply via Email
                          </a>

                          <div className="ml-auto">
                            {confirmId === item.id ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDelete("template", item.id)}
                                  disabled={isPending && pendingId === item.id}
                                  className="rounded-full bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                                >
                                  {isPending && pendingId === item.id ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                  ) : "Confirm"}
                                </button>
                                <button
                                  onClick={() => setConfirmId(null)}
                                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmId(item.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-red-300 transition-colors hover:border-red-400"
                                aria-label="Delete"
                              >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
