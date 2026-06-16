import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/lib/supabase/server";
import TemplateForm from "@/components/admin/TemplateForm";
import { updateTemplate, type TemplateFormState } from "@/app/admin/(dashboard)/templates/actions";
import type { Template } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Template",
  robots: { index: false, follow: false },
};

interface EditTemplatePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const template = data as Template;
  const boundAction = updateTemplate.bind(null, template.id) as (
    state: TemplateFormState,
    formData: FormData
  ) => Promise<TemplateFormState>;

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/admin/templates"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back to Templates
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Template</h1>
      <p className="mt-1 text-text-secondary">{template.title}</p>

      <div className="mt-8 max-w-3xl rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <TemplateForm
          action={boundAction}
          defaultValues={{
            title: template.title,
            slug: template.slug,
            category: template.category,
            description: template.description || "",
            features: template.features,
            demo_url: template.demo_url || "",
            featured_image: template.featured_image || "",
            price_min: template.price_min,
            price_max: template.price_max,
            is_featured: template.is_featured,
            status: template.status,
            sort_order: template.sort_order,
          }}
        />
      </div>
    </div>
  );
}
