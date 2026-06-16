"use client";

import { useActionState, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCircleExclamation, faImage,
  faSpinner, faXmark, faToggleOn, faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";
import type { TemplateFormState } from "@/app/admin/(dashboard)/templates/actions";

interface TemplateFormProps {
  action: (state: TemplateFormState, formData: FormData) => Promise<TemplateFormState>;
  defaultValues?: {
    title?: string; slug?: string; category?: string;
    description?: string; features?: string[]; demo_url?: string;
    featured_image?: string; price_min?: number | null; price_max?: number | null;
    is_featured?: boolean; status?: string; sort_order?: number;
  };
}

const initialState: TemplateFormState = { status: "idle" };

export default function TemplateForm({ action, defaultValues }: TemplateFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [featuredImage, setFeaturedImage] = useState(defaultValues?.featured_image || "");
  const [isFeatured, setIsFeatured] = useState(defaultValues?.is_featured || false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(defaultValues?.title || "");
  const [slug, setSlug] = useState(defaultValues?.slug || "");
  const [slugEdited, setSlugEdited] = useState(!!defaultValues?.slug);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload/template-image", { method: "POST", body: fd });
    const json = await res.json();

    if (json.url) {
      setFeaturedImage(json.url);
    } else {
      setUploadError(json.error || "Upload failed");
    }
    setUploading(false);
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-white focus:outline-none";
  const labelClass = "mb-2 block text-sm font-medium text-text-secondary";

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="featured_image" value={featuredImage} />
      <input type="hidden" name="is_featured" value={isFeatured ? "on" : ""} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title *</label>
          <input name="title" required value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Apex Business" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" required value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
            placeholder="apex-business" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Category *</label>
        <select name="category" required defaultValue={defaultValues?.category || ""}
          className={inputClass}>
          <option value="" disabled>Select a category</option>
          {TEMPLATE_CATEGORIES.filter(c => c !== "All").map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={4} defaultValue={defaultValues?.description || ""}
          placeholder="What this template is good for..." className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className={labelClass}>Features <span className="text-text-secondary/60">(comma-separated)</span></label>
        <textarea name="features" rows={3}
          defaultValue={defaultValues?.features?.join(", ") || ""}
          placeholder="Responsive design, Contact form, SEO ready, CMS integration"
          className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className={labelClass}>Demo URL</label>
        <input name="demo_url" type="url" defaultValue={defaultValues?.demo_url || ""}
          placeholder="https://example.com" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Price Min (₦)</label>
          <input name="price_min" type="number" step="1" min="0"
            defaultValue={defaultValues?.price_min ?? ""}
            placeholder="150000" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price Max (₦)</label>
          <input name="price_max" type="number" step="1" min="0"
            defaultValue={defaultValues?.price_max ?? ""}
            placeholder="300000" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" defaultValue={defaultValues?.status || "published"} className={inputClass}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input name="sort_order" type="number" defaultValue={defaultValues?.sort_order ?? 0}
            className={inputClass} />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
        <div>
          <p className="text-sm font-medium">Featured Template</p>
          <p className="text-xs text-text-secondary">Show this template in the homepage preview</p>
        </div>
        <button type="button" onClick={() => setIsFeatured(v => !v)}
          className="text-2xl transition-colors">
          <FontAwesomeIcon icon={isFeatured ? faToggleOn : faToggleOff}
            className={isFeatured ? "text-white" : "text-text-secondary"} />
        </button>
      </div>

      <div>
        <label className={labelClass}>Featured Image</label>
        {featuredImage ? (
          <div className="relative inline-block">
            <img src={featuredImage} alt="Featured" className="h-40 w-auto rounded-2xl border border-border object-cover" />
            <button type="button" onClick={() => setFeaturedImage("")}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()}
            className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border transition-colors hover:border-white">
            {uploading
              ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-text-secondary" />
              : <>
                  <FontAwesomeIcon icon={faImage} className="text-xl text-text-secondary" />
                  <span className="text-sm text-text-secondary">Click to upload image</span>
                </>
            }
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
      </div>

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
        {isPending ? "Saving..." : "Save Template"}
        {!isPending && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
      </motion.button>
    </form>
  );
}
