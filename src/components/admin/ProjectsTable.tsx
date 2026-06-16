"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "@/app/admin/(dashboard)/projects/actions";
import type { Project } from "@/types/database";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [items, setItems] = useState(projects);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setPendingId(id);
    startTransition(async () => {
      await deleteProject(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
      setPendingId(null);
      setConfirmId(null);
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-background-secondary p-12 text-center">
        <p className="text-lg font-semibold">No projects yet</p>
        <p className="mt-2 text-sm text-text-secondary">
          Create your first project to show it on your portfolio page.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border">
      <div className="hidden grid-cols-[2fr_1fr_1fr_100px_140px] gap-4 border-b border-border bg-background-secondary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary sm:grid">
        <span>Title</span>
        <span>Category</span>
        <span>Status</span>
        <span>Featured</span>
        <span className="text-right">Actions</span>
      </div>

      <AnimatePresence>
        {items.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 border-b border-border bg-background-secondary px-6 py-4 last:border-b-0 sm:grid-cols-[2fr_1fr_1fr_100px_140px] sm:items-center"
          >
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-xs text-text-secondary">{project.client_name || "—"}</p>
            </div>
            <span className="text-sm text-text-secondary">{project.category}</span>
            <span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  project.status === "published"
                    ? "bg-white text-black"
                    : "border border-border text-text-secondary"
                }`}
              >
                {project.status === "published" ? "Published" : "Draft"}
              </span>
            </span>
            <span>
              {project.is_featured && (
                <FontAwesomeIcon icon={faStar} className="text-sm text-white" />
              )}
            </span>
            <div className="flex items-center justify-start gap-3 sm:justify-end">
              <Link
                href={`/admin/projects/${project.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-white"
                aria-label="Edit"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
              </Link>

              {confirmId === project.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={isPending && pendingId === project.id}
                    className="rounded-full bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    {isPending && pendingId === project.id ? (
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
                  onClick={() => setConfirmId(project.id)}
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
