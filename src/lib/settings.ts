import { createClient } from "@/lib/supabase/server";
import type { Settings } from "@/types/database";

const FALLBACK_SETTINGS: Settings = {
  id: "fallback",
  agency_name: "Brodrick Web Design",
  logo_url: null,
  email: "hello@brodrickwebdesign.com",
  phone: null,
  whatsapp: "+2348000000000",
  facebook_url: null,
  instagram_url: null,
  linkedin_url: null,
  twitter_url: null,
  footer_text: "© 2026 Brodrick Web Design. All rights reserved.",
  seo_title: "Brodrick Web Design — Premium Web Development Agency",
  seo_description:
    "We design and build premium, high-converting websites and web applications for businesses that demand excellence.",
  address: null,
  updated_at: new Date().toISOString(),
};

export async function getSiteSettings(): Promise<Settings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return FALLBACK_SETTINGS;
    }

    return data as Settings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}
