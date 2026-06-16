import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/lib/supabase/server";
import ProjectsTable from "@/components/admin/ProjectsTable";
import type { Project } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = (data || []) as Project[];

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-text-secondary">
            Manage the portfolio projects shown on your site.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-text-secondary"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          New Project
        </Link>
      </div>

      <div className="mt-8">
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
}
