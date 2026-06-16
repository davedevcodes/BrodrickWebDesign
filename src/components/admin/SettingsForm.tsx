"use client";

import { useActionState, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCircleCheck, faCircleExclamation,
  faImage, faSpinner, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { updateSettings, type SettingsFormState } from "@/app/admin/(dashboard)/settings/actions";
import type { Settings } from "@/types/database";

const initialState: SettingsFormState = { status: "idle" };

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, isPending] = useActionState(updateSettings, initialState);
  const [logoUrl, setLogoUrl] = useState(settings.logo_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload/logo", { method: "POST", body: fd });
    const json = await res.json();

    if (json.url) {
      setLogoUrl(json.url);
    } else {
      setUploadError(json.error || "Upload failed");
    }
    setUploading(false);
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none";
  const labelClass = "mb-2 block text-sm font-medium text-text-secondary";

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="id" value={settings.id} />
      <input type="hidden" name="logo_url" value={logoUrl} />

      {/* Agency Info */}
      <section>
        <h2 className="text-lg font-semibold">Agency Information</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Basic information about your agency, shown in the navbar, footer, and metadata.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className={labelClass}>Agency Name *</label>
            <input name="agency_name" required defaultValue={settings.agency_name}
              placeholder="Brodrick Web Design" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Logo</label>
            {logoUrl ? (
              <div className="relative inline-block rounded-2xl border border-border bg-white p-4">
                <Image src={logoUrl} alt="Logo" width={140} height={40} className="h-10 w-auto object-contain" />
                <button type="button" onClick={() => setLogoUrl("")}
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-lg">
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()}
                className="flex h-24 w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border transition-colors hover:border-white">
                {uploading
                  ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-text-secondary" />
                  : <>
                      <FontAwesomeIcon icon={faImage} className="text-xl text-text-secondary" />
                      <span className="text-sm text-text-secondary">Click to upload logo</span>
                    </>
                }
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
            <p className="mt-2 text-xs text-text-secondary">
              Note: the live site currently reads the logo from <code className="rounded bg-white/10 px-1.5 py-0.5">/public/logo.png</code>.
              Uploading here stores the URL for future use across the admin and site.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Contact Info */}
      <section>
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Shown on the Contact page and used for CTAs across the site.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" defaultValue={settings.email || ""}
              placeholder="hello@example.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" type="tel" defaultValue={settings.phone || ""}
              placeholder="+234..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp Number</label>
            <input name="whatsapp" type="tel" defaultValue={settings.whatsapp || ""}
              placeholder="+234..." className={inputClass} />
            <p className="mt-1 text-xs text-text-secondary">
              Include country code. Used for WhatsApp CTA links.
            </p>
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input name="address" defaultValue={settings.address || ""}
              placeholder="Lagos, Nigeria" className={inputClass} />
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Social Links */}
      <section>
        <h2 className="text-lg font-semibold">Social Links</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Shown in the Contact page&apos;s &quot;Follow Us&quot; section. Leave blank to hide.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input name="facebook_url" type="url" defaultValue={settings.facebook_url || ""}
              placeholder="https://facebook.com/..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input name="instagram_url" type="url" defaultValue={settings.instagram_url || ""}
              placeholder="https://instagram.com/..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input name="linkedin_url" type="url" defaultValue={settings.linkedin_url || ""}
              placeholder="https://linkedin.com/..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Twitter / X URL</label>
            <input name="twitter_url" type="url" defaultValue={settings.twitter_url || ""}
              placeholder="https://x.com/..." className={inputClass} />
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Footer */}
      <section>
        <h2 className="text-lg font-semibold">Footer</h2>

        <div className="mt-6">
          <label className={labelClass}>Footer Text</label>
          <input name="footer_text" defaultValue={settings.footer_text || ""}
            placeholder="© 2026 Brodrick Web Design. All rights reserved." className={inputClass} />
        </div>
      </section>

      <div className="border-t border-border" />

      {/* SEO */}
      <section>
        <h2 className="text-lg font-semibold">SEO Settings</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Default metadata used across the site when a page doesn&apos;t define its own.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input name="seo_title" defaultValue={settings.seo_title || ""}
              placeholder="Brodrick Web Design — Premium Web Development Agency" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea name="seo_description" rows={3} defaultValue={settings.seo_description || ""}
              placeholder="We design and build premium, high-converting websites..."
              className={`${inputClass} resize-none`} />
          </div>
        </div>
      </section>

      {state.status === "success" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
          <span>{state.message}</span>
        </motion.div>
      )}

      {state.status === "error" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5" />
          <span>{state.message}</span>
        </motion.div>
      )}

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        type="submit" disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-text-secondary disabled:opacity-60">
        {isPending ? "Saving..." : "Save Settings"}
        {!isPending && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
      </motion.button>
    </form>
  );
}
