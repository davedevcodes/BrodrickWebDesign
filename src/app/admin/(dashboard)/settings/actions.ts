"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const settingsSchema = z.object({
  id: z.string().min(1),
  agency_name: z.string().min(1, "Agency name is required"),
  logo_url: z.string().optional().or(z.literal("")),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  facebook_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  footer_text: z.string().optional().or(z.literal("")),
  seo_title: z.string().optional().or(z.literal("")),
  seo_description: z.string().optional().or(z.literal("")),
});

export interface SettingsFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = settingsSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message || "Invalid input." };
  }

  const { id, ...fields } = parsed.data;
  const supabase = await createClient();

  const payload = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value === "" ? null : value])
  );

  const { error } = await (supabase.from("settings") as any)
    .update(payload)
    .eq("id", id);

  if (error) {
    return { status: "error", message: error.message };
  }

  // Log activity
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: admin } = await (supabase.from("admins") as any)
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (admin) {
      await (supabase.from("activity_logs") as any).insert({
        admin_id: admin.id,
        action: "updated",
        entity_type: "settings",
        entity_id: id,
        description: "Updated site settings",
      });
    }
  }

  // Revalidate everything since settings affect navbar, footer, contact page, etc.
  revalidatePath("/", "layout");

  return { status: "success", message: "Settings saved successfully." };
}

export async function uploadLogo(formData: FormData): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get("file") as File | null;
  if (!file) return { url: null, error: "No file provided" };

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "png";
  const filename = `logo-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("site-assets")
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (error) return { url: null, error: error.message };

  const { data: { publicUrl } } = supabase.storage
    .from("site-assets")
    .getPublicUrl(data.path);

  return { url: publicUrl, error: null };
}
