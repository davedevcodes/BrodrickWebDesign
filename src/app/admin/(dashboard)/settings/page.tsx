import type { Metadata } from "next";
import SettingsForm from "@/components/admin/SettingsForm";
import { createClient } from "@/lib/supabase/server";
import type { Settings } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

async function getOrCreateSettings(): Promise<Settings> {
  const supabase = await createClient();

  const { data } = await supabase.from("settings").select("*").limit(1).maybeSingle();

  if (data) return data as Settings;

  // No settings row exists yet — create a default one
  const { data: created, error } = await (supabase.from("settings") as any)
    .insert({ agency_name: "Brodrick Web Design" })
    .select("*")
    .single();

  if (error || !created) {
    // Fallback if insert fails (e.g. RLS) — return an in-memory shape with a
    // placeholder id; saving will then fail with a clear message.
    return {
      id: "",
      agency_name: "Brodrick Web Design",
      logo_url: null,
      email: null,
      phone: null,
      whatsapp: null,
      facebook_url: null,
      instagram_url: null,
      linkedin_url: null,
      twitter_url: null,
      footer_text: null,
      seo_title: null,
      seo_description: null,
      address: null,
      updated_at: new Date().toISOString(),
    };
  }

  return created as Settings;
}

export default async function AdminSettingsPage() {
  const settings = await getOrCreateSettings();

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-text-secondary">
        Manage your agency&apos;s information, contact details, social links, and SEO defaults.
      </p>

      <div className="mt-8 max-w-3xl rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
