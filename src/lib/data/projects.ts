import { createPublicClient } from "@/lib/supabase/server";
import type { Project, ProjectImage } from "@/types/database";
import { FALLBACK_PROJECTS } from "@/lib/data/home";

export { PROJECT_CATEGORIES } from "@/lib/constants";

export async function getAllProjects(): Promise<Partial<Project>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
    return data;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Partial<Project> | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
    }
    return data;
  } catch {
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  if (projectId.startsWith("fallback")) return [];

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("status", "published");

    if (error || !data) return [];
    return data.map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}
