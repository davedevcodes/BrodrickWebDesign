"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  client_name: z.string().optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().or(z.literal("")),
  results: z.string().optional().or(z.literal("")),
  tech_stack: z.string().optional().or(z.literal("")),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  case_study_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured_image: z.string().optional().or(z.literal("")),
  is_featured: z.string().optional(),
  status: z.enum(["published", "draft"]),
  sort_order: z.string().optional(),
});

export interface ProjectFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

async function logActivity(
  supabase: Awaited<ReturnType<typeof createClient>>,
  action: string,
  entityId: string,
  description: string
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: admin } = await (supabase.from("admins") as any).select("id").eq("user_id", user.id).maybeSingle();
  if (!admin) return;
  await (supabase.from("activity_logs") as any).insert({
    admin_id: admin.id,
    action,
    entity_type: "project",
    entity_id: entityId,
    description,
  });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const { tech_stack, is_featured, sort_order, ...rest } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await (supabase.from("projects") as any).insert({
    ...rest,
    client_name: rest.client_name || null,
    description: rest.description || null,
    results: rest.results || null,
    live_url: rest.live_url || null,
    case_study_url: rest.case_study_url || null,
    featured_image: rest.featured_image || null,
    tech_stack: tech_stack ? tech_stack.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    is_featured: is_featured === "on",
    sort_order: sort_order ? parseInt(sort_order) : 0,
  }).select("id, title").single();

  if (error) {
    if (error.code === "23505") return { status: "error", message: "A project with this slug already exists." };
    return { status: "error", message: error.message };
  }

  await logActivity(supabase, "created", data.id, `Created project: ${data.title}`);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const { tech_stack, is_featured, sort_order, ...rest } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await (supabase.from("projects") as any)
    .update({
      ...rest,
      client_name: rest.client_name || null,
      description: rest.description || null,
      results: rest.results || null,
      live_url: rest.live_url || null,
      case_study_url: rest.case_study_url || null,
      featured_image: rest.featured_image || null,
      tech_stack: tech_stack ? tech_stack.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      is_featured: is_featured === "on",
      sort_order: sort_order ? parseInt(sort_order) : 0,
    })
    .eq("id", id)
    .select("id, title")
    .single();

  if (error) {
    if (error.code === "23505") return { status: "error", message: "A project with this slug already exists." };
    return { status: "error", message: error.message };
  }

  await logActivity(supabase, "updated", data.id, `Updated project: ${data.title}`);
  revalidatePath("/admin/projects");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  const { data } = await (supabase.from("projects") as any).select("title").eq("id", id).single();
  await (supabase.from("projects") as any).delete().eq("id", id);
  await logActivity(supabase, "deleted", id, `Deleted project: ${data?.title}`);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}

export async function uploadProjectImage(formData: FormData): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get("file") as File;
  if (!file) return { url: null, error: "No file provided" };

  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(filename, file, { upsert: false });

  if (error) return { url: null, error: error.message };

  const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(data.path);

  return { url: publicUrl, error: null };
}
