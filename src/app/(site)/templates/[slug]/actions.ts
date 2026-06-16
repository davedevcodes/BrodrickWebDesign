"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const inquirySchema = z.object({
  templateId: z.string().min(1),
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export interface InquiryFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitTemplateInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = {
    templateId: formData.get("templateId")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Please check your details and try again.",
    };
  }

  // Skip persistence for fallback/demo templates (no real DB row)
  if (parsed.data.templateId.startsWith("fallback")) {
    return {
      status: "success",
      message: "Thanks! We've received your request and will be in touch shortly.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("template_inquiries") as any).insert({
      template_id: parsed.data.templateId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
    });

    if (error) {
      return {
        status: "error",
        message: "Something went wrong submitting your request. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Thanks! We've received your request and will be in touch shortly.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong submitting your request. Please try again.",
    };
  }
}
