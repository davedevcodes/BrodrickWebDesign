import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/app/admin/(dashboard)/projects/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Project",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back to Projects
      </Link>

      <h1 className="mt-4 text-3xl font-bold">New Project</h1>
      <p className="mt-1 text-text-secondary">
        Add a new project to your portfolio.
      </p>

      <div className="mt-8 max-w-3xl rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
