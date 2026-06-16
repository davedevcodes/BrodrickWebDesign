"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type InquiryKind = "contact" | "template";
type InquiryStatus = "new" | "read" | "replied";

const tableMap: Record<InquiryKind, "contact_submissions" | "template_inquiries"> = {
  contact: "contact_submissions",
  template: "template_inquiries",
};

export async function updateInquiryStatus(
  kind: InquiryKind,
  id: string,
  status: InquiryStatus
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const table = tableMap[kind];

  const { error } = await (supabase.from(table) as any)
    .update({ status })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteInquiry(
  kind: InquiryKind,
  id: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const table = tableMap[kind];

  const { error } = await (supabase.from(table) as any).delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { error: null };
}
