"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a bit more about your project").max(2000),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    company: formData.get("company")?.toString() || "",
    service: formData.get("service")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Please check your details and try again.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("contact_submissions") as any).insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      service_needed: parsed.data.service || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
      source: "contact_page",
    });

    if (error) {
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Thanks for reaching out! We've received your message and will get back to you within 24 hours.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}
