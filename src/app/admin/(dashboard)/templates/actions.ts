"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const templateSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().or(z.literal("")),
  features: z.string().optional().or(z.literal("")),
  demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured_image: z.string().optional().or(z.literal("")),
  price_min: z.string().optional().or(z.literal("")),
  price_max: z.string().optional().or(z.literal("")),
  is_featured: z.string().optional(),
  status: z.enum(["published", "draft"]),
  sort_order: z.string().optional(),
});

export interface TemplateFormState {
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
    entity_type: "template",
    entity_id: entityId,
    description,
  });
}

function buildPayload(parsed: z.infer<typeof templateSchema>) {
  const { features, is_featured, sort_order, price_min, price_max, ...rest } = parsed;
  return {
    ...rest,
    description: rest.description || null,
    demo_url: rest.demo_url || null,
    featured_image: rest.featured_image || null,
    features: features ? features.split(",").map((f: string) => f.trim()).filter(Boolean) : [],
    price_min: price_min ? parseFloat(price_min) : null,
    price_max: price_max ? parseFloat(price_max) : null,
    is_featured: is_featured === "on",
    sort_order: sort_order ? parseInt(sort_order) : 0,
  };
}

export async function createTemplate(
  _prevState: TemplateFormState,
  formData: FormData
): Promise<TemplateFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = templateSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { data, error } = await (supabase.from("templates") as any)
    .insert(buildPayload(parsed.data))
    .select("id, title")
    .single();

  if (error) {
    if (error.code === "23505") return { status: "error", message: "A template with this slug already exists." };
    return { status: "error", message: error.message };
  }

  await logActivity(supabase, "created", data.id, `Created template: ${data.title}`);
  revalidatePath("/admin/templates");
  revalidatePath("/templates");
  redirect("/admin/templates");
}

export async function updateTemplate(
  id: string,
  _prevState: TemplateFormState,
  formData: FormData
): Promise<TemplateFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = templateSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { data, error } = await (supabase.from("templates") as any)
    .update(buildPayload(parsed.data))
    .eq("id", id)
    .select("id, title, slug")
    .single();

  if (error) {
    if (error.code === "23505") return { status: "error", message: "A template with this slug already exists." };
    return { status: "error", message: error.message };
  }

  await logActivity(supabase, "updated", data.id, `Updated template: ${data.title}`);
  revalidatePath("/admin/templates");
  revalidatePath(`/templates/${data.slug}`);
  revalidatePath("/templates");
  redirect("/admin/templates");
}

export async function deleteTemplate(id: string): Promise<void> {
  const supabase = await createClient();
  const { data } = await (supabase.from("templates") as any).select("title").eq("id", id).single();
  await (supabase.from("templates") as any).delete().eq("id", id);
  await logActivity(supabase, "deleted", id, `Deleted template: ${data?.title}`);
  revalidatePath("/admin/templates");
  revalidatePath("/templates");
}
