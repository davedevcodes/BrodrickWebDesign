# Deployment Guide — Brodrick Web Design

This guide covers deploying the agency site to **Vercel** with **Supabase** as the backend.

---

## 1. Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project (already set up if you ran `supabase/schema.sql`)
- Your project pushed to a GitHub/GitLab/Bitbucket repository

---

## 2. Supabase Setup Checklist

If you haven't already:

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql` (creates tables, RLS policies, storage buckets, and seed data).
3. Create your admin user:
   - **Authentication → Users → Add user** (check "Auto Confirm User" or run the `email_confirmed_at` SQL update).
   - Copy the user's UUID.
   - Run: `insert into public.admins (user_id) values ('<uuid>');`
4. Confirm there is exactly **one row** in `public.settings`:
   ```sql
   select count(*) from public.settings;
   ```
   If more than one, keep the correct row and delete the rest (see earlier troubleshooting notes), then run:
   ```sql
   create unique index if not exists settings_singleton on public.settings ((true));
   ```
5. From **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

---

## 3. Environment Variables

Set these in Vercel (**Project Settings → Environment Variables**) for Production, Preview, and Development as needed:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (server-only, never exposed to the client) |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://brodrickwebdesign.com` (no trailing slash) |

`NEXT_PUBLIC_SITE_URL` is used for `metadataBase`, canonical URLs, sitemap.xml, robots.txt, and Open Graph/Twitter card URLs — make sure it matches your real domain.

---

## 4. Deploying to Vercel

### Option A — Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new) and import your Git repository.
2. Framework Preset: **Next.js** (auto-detected).
3. Add the environment variables from Step 3.
4. Click **Deploy**.

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel        # preview deployment
vercel --prod # production deployment
```

The CLI will prompt you to link the project and can pull/push environment variables with `vercel env`.

---

## 5. Custom Domain

1. In Vercel, go to **Project → Settings → Domains** and add your domain.
2. Update your DNS records as instructed by Vercel (usually an `A` record to `76.76.21.21` or a `CNAME` to `cname.vercel-dns.com`).
3. Once verified, update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

---

## 6. Post-Deployment Checklist

- [ ] Visit `/` — homepage loads, hero animations work
- [ ] Visit `/portfolio`, `/templates`, `/about`, `/contact` — all render correctly
- [ ] Submit the contact form — check it appears in `/admin/inquiries`
- [ ] Visit `/templates/[any-slug]` and submit "Select this template" — check it appears under the Template Inquiries tab
- [ ] Visit `/admin/login` and sign in with your admin account
- [ ] Create/edit/delete a project and template — verify changes reflect on `/portfolio` and `/templates` (may take up to a few seconds due to revalidation)
- [ ] Update Settings (agency name, social links, WhatsApp) — verify navbar/footer/contact page update
- [ ] Visit `/sitemap.xml` and `/robots.txt` — confirm they load and reference your real domain
- [ ] Run a [PageSpeed Insights](https://pagespeed.web.dev/) or Lighthouse audit on the production URL

---

## 7. Ongoing Content Management

Once deployed, all day-to-day content changes are made through `/admin`:

- **Projects** — add/edit/remove portfolio items, mark featured projects for the homepage
- **Templates** — add/edit/remove website templates, set pricing and features
- **Inquiries** — respond to contact form submissions and template selection requests
- **Settings** — update contact info, social links, footer text, and SEO defaults

No code changes or redeploys are needed for content updates — Supabase is the source of truth, and pages revalidate automatically (within ~1 hour, or instantly after an admin edit via on-demand revalidation).

---

## 8. Updating the Logo

The navbar, footer, and admin sidebar reference `/public/logo.png`. To change the logo:

1. Replace `public/logo.png` in your repository with the new logo file (same filename).
2. Commit and push — Vercel will redeploy automatically.

(The Settings page also supports uploading a logo to Supabase Storage for future use, but the static file is what's currently rendered.)

---

## 9. Adding More Admins

Repeat the admin user creation steps for each new admin:

1. Create the user in **Supabase → Authentication → Users**.
2. Copy their UUID.
3. Run: `insert into public.admins (user_id) values ('<uuid>');`

They can now log in at `/admin/login` with full access to the dashboard.
