import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TemplateForm from "@/components/admin/TemplateForm";
import { createTemplate } from "@/app/admin/(dashboard)/templates/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Template",
  robots: { index: false, follow: false },
};

export default function NewTemplatePage() {
  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/admin/templates"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back to Templates
      </Link>

      <h1 className="mt-4 text-3xl font-bold">New Template</h1>
      <p className="mt-1 text-text-secondary">
        Add a new website template.
      </p>

      <div className="mt-8 max-w-3xl rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <TemplateForm action={createTemplate} />
      </div>
    </div>
  );
}
