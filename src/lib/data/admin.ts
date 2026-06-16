import { createClient } from "@/lib/supabase/server";
import type { ActivityLog } from "@/types/database";

export interface DashboardStats {
  totalProjects: number;
  totalTemplates: number;
  totalContactRequests: number;
  newContactRequests: number;
  totalTemplateInquiries: number;
  newTemplateInquiries: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [
    projectsRes,
    templatesRes,
    contactsRes,
    newContactsRes,
    inquiriesRes,
    newInquiriesRes,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("templates").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("template_inquiries").select("id", { count: "exact", head: true }),
    supabase
      .from("template_inquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    totalProjects: projectsRes.count ?? 0,
    totalTemplates: templatesRes.count ?? 0,
    totalContactRequests: contactsRes.count ?? 0,
    newContactRequests: newContactsRes.count ?? 0,
    totalTemplateInquiries: inquiriesRes.count ?? 0,
    newTemplateInquiries: newInquiriesRes.count ?? 0,
  };
}

export async function getRecentActivity(limit = 8): Promise<ActivityLog[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  service_needed: string | null;
  status: string;
  created_at: string;
}

export async function getRecentContactSubmissions(limit = 5): Promise<RecentContact[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, name, email, service_needed, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
