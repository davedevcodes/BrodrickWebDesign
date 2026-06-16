import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject, type ProjectFormState } from "@/app/admin/(dashboard)/projects/actions";
import type { Project } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Project",
  robots: { index: false, follow: false },
};

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const project = data as Project;
  const boundAction = updateProject.bind(null, project.id) as (
    state: ProjectFormState,
    formData: FormData
  ) => Promise<ProjectFormState>;

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back to Projects
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Project</h1>
      <p className="mt-1 text-text-secondary">{project.title}</p>

      <div className="mt-8 max-w-3xl rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <ProjectForm
          action={boundAction}
          defaultValues={{
            title: project.title,
            slug: project.slug,
            client_name: project.client_name || "",
            category: project.category,
            description: project.description || "",
            results: project.results || "",
            tech_stack: project.tech_stack,
            live_url: project.live_url || "",
            case_study_url: project.case_study_url || "",
            featured_image: project.featured_image || "",
            is_featured: project.is_featured,
            status: project.status,
            sort_order: project.sort_order,
          }}
        />
      </div>
    </div>
  );
}
