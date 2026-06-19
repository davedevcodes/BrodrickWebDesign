import { createPublicClient } from "@/lib/supabase/server";
import type { Template, TemplateImage } from "@/types/database";
import { FALLBACK_TEMPLATES } from "@/lib/data/home";

export async function getAllTemplates(): Promise<Partial<Template>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_TEMPLATES;
    return data;
  } catch {
    return FALLBACK_TEMPLATES;
  }
}

export async function getTemplateBySlug(slug: string): Promise<Partial<Template> | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return FALLBACK_TEMPLATES.find((t) => t.slug === slug) || null;
    }
    return data;
  } catch {
    return FALLBACK_TEMPLATES.find((t) => t.slug === slug) || null;
  }
}

export async function getTemplateImages(templateId: string): Promise<TemplateImage[]> {
  if (templateId.startsWith("fallback")) return [];

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("template_images")
      .select("*")
      .eq("template_id", templateId)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getAllTemplateSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("templates")
      .select("slug")
      .eq("status", "published");

    if (error || !data) return [];
    return data.map((t: { slug: string }) => t.slug);
  } catch {
    return [];
  }
}
