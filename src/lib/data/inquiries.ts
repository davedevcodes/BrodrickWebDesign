import { createClient } from "@/lib/supabase/server";
import type { ContactSubmission, TemplateInquiry } from "@/types/database";

export interface TemplateInquiryWithTemplate extends TemplateInquiry {
  template_title?: string | null;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getTemplateInquiries(): Promise<TemplateInquiryWithTemplate[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("template_inquiries")
      .select("*, templates(title)")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row: any) => ({
      ...row,
      template_title: row.templates?.title ?? null,
      templates: undefined,
    }));
  } catch {
    return [];
  }
}
