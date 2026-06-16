"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { deleteTemplate } from "@/app/admin/(dashboard)/templates/actions";
import { formatNaira } from "@/lib/constants";
import type { Template } from "@/types/database";

export default function TemplatesTable({ templates }: { templates: Template[] }) {
  const [items, setItems] = useState(templates);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setPendingId(id);
    startTransition(async () => {
      await deleteTemplate(id);
      setItems((prev) => prev.filter((t) => t.id !== id));
      setPendingId(null);
      setConfirmId(null);
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-background-secondary p-12 text-center">
        <p className="text-lg font-semibold">No templates yet</p>
        <p className="mt-2 text-sm text-text-secondary">
          Create your first template to show it on the templates page.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border">
      <div className="hidden grid-cols-[2fr_1fr_1fr_100px_140px] gap-4 border-b border-border bg-background-secondary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary sm:grid">
        <span>Title</span>
        <span>Category</span>
        <span>Price Range</span>
        <span>Featured</span>
        <span className="text-right">Actions</span>
      </div>

      <AnimatePresence>
        {items.map((template) => (
          <motion.div
            key={template.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 border-b border-border bg-background-secondary px-6 py-4 last:border-b-0 sm:grid-cols-[2fr_1fr_1fr_100px_140px] sm:items-center"
          >
            <div>
              <p className="font-medium">{template.title}</p>
              <p className="text-xs text-text-secondary">
                {template.status === "published" ? "Published" : "Draft"}
              </p>
            </div>
            <span className="text-sm text-text-secondary">{template.category}</span>
            <span className="text-sm text-text-secondary">
              {formatNaira(template.price_min, template.price_max)}
            </span>
            <span>
              {template.is_featured && (
                <FontAwesomeIcon icon={faStar} className="text-sm text-white" />
              )}
            </span>
            <div className="flex items-center justify-start gap-3 sm:justify-end">
              <Link
                href={`/admin/templates/${template.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-white"
                aria-label="Edit"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
              </Link>

              {confirmId === template.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(template.id)}
                    disabled={isPending && pendingId === template.id}
                    className="rounded-full bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    {isPending && pendingId === template.id ? (
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    ) : (
                      "Confirm"
                    )}
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
                  onClick={() => setConfirmId(template.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-red-300 transition-colors hover:border-red-400"
                  aria-label="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
