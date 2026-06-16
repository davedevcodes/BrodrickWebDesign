-- =========================================================
-- FORGE STUDIO — SUPABASE DATABASE SCHEMA
-- Run this in the Supabase SQL Editor (Project > SQL Editor)
-- =========================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- =========================================================
-- TABLE: profiles
-- Linked 1:1 with auth.users
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- TABLE: admins
-- Whitelist of users who may access /admin
-- =========================================================
create table if not exists public.admins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- =========================================================
-- TABLE: service_categories
-- =========================================================
create table if not exists public.service_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================
-- TABLE: projects
-- =========================================================
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  client_name text,
  category text not null,
  description text,
  results text,
  tech_stack text[] not null default '{}',
  live_url text,
  case_study_url text,
  featured_image text,
  is_featured boolean not null default false,
  status text not null default 'published', -- draft | published
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_category on public.projects(category);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_slug on public.projects(slug);

-- =========================================================
-- TABLE: project_images
-- =========================================================
create table if not exists public.project_images (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_project_images_project_id on public.project_images(project_id);

-- =========================================================
-- TABLE: templates
-- =========================================================
create table if not exists public.templates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  features text[] not null default '{}',
  category text not null,
  demo_url text,
  featured_image text,
  price_min numeric,
  price_max numeric,
  is_featured boolean not null default false,
  status text not null default 'published', -- draft | published
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_templates_category on public.templates(category);
create index if not exists idx_templates_status on public.templates(status);
create index if not exists idx_templates_slug on public.templates(slug);

-- =========================================================
-- TABLE: template_images
-- =========================================================
create table if not exists public.template_images (
  id uuid primary key default uuid_generate_v4(),
  template_id uuid not null references public.templates(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_template_images_template_id on public.template_images(template_id);

-- =========================================================
-- TABLE: contact_submissions
-- =========================================================
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service_needed text,
  budget text,
  message text not null,
  status text not null default 'new', -- new | read | replied
  source text not null default 'contact_page',
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_submissions_status on public.contact_submissions(status);
create index if not exists idx_contact_submissions_created_at on public.contact_submissions(created_at desc);

-- =========================================================
-- TABLE: template_inquiries
-- "Select this template" submissions
-- =========================================================
create table if not exists public.template_inquiries (
  id uuid primary key default uuid_generate_v4(),
  template_id uuid references public.templates(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new', -- new | read | replied
  created_at timestamptz not null default now()
);

create index if not exists idx_template_inquiries_status on public.template_inquiries(status);

-- =========================================================
-- TABLE: testimonials
-- =========================================================
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_role text,
  client_company text,
  avatar_url text,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================
-- TABLE: settings
-- Single-row table for global site settings
-- =========================================================
create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  agency_name text not null default 'Forge Studio',
  logo_url text,
  email text,
  phone text,
  whatsapp text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  footer_text text,
  seo_title text,
  seo_description text,
  address text,
  updated_at timestamptz not null default now()
);

-- =========================================================
-- TABLE: activity_logs
-- =========================================================
create table if not exists public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references public.admins(id) on delete set null,
  action text not null,        -- created | updated | deleted
  entity_type text not null,   -- project | template | contact | settings | testimonial
  entity_id uuid,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_logs_created_at on public.activity_logs(created_at desc);

-- =========================================================
-- updated_at triggers
-- =========================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at_projects on public.projects;
create trigger set_updated_at_projects
  before update on public.projects
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at_templates on public.templates;
create trigger set_updated_at_templates
  before update on public.templates
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at_settings on public.settings;
create trigger set_updated_at_settings
  before update on public.settings
  for each row execute procedure public.set_updated_at();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.service_categories enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.templates enable row level security;
alter table public.template_images enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.template_inquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.settings enable row level security;
alter table public.activity_logs enable row level security;

-- Helper function: is the current user an admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$ language sql security definer stable;

-- ---------------------------------------------------------
-- profiles: users can read/update their own profile
-- ---------------------------------------------------------
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ---------------------------------------------------------
-- admins: only admins can view the admin list
-- ---------------------------------------------------------
create policy "Admins can view admin list"
  on public.admins for select
  using (public.is_admin());

-- ---------------------------------------------------------
-- service_categories: public read, admin write
-- ---------------------------------------------------------
create policy "Public can view service categories"
  on public.service_categories for select
  using (true);

create policy "Admins can manage service categories"
  on public.service_categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- projects: public can read published, admin can do everything
-- ---------------------------------------------------------
create policy "Public can view published projects"
  on public.projects for select
  using (status = 'published' or public.is_admin());

create policy "Admins can manage projects"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- project_images: follow parent project visibility
-- ---------------------------------------------------------
create policy "Public can view project images"
  on public.project_images for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id
      and (p.status = 'published' or public.is_admin())
    )
  );

create policy "Admins can manage project images"
  on public.project_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- templates: public can read published, admin can do everything
-- ---------------------------------------------------------
create policy "Public can view published templates"
  on public.templates for select
  using (status = 'published' or public.is_admin());

create policy "Admins can manage templates"
  on public.templates for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- template_images
-- ---------------------------------------------------------
create policy "Public can view template images"
  on public.template_images for select
  using (
    exists (
      select 1 from public.templates t
      where t.id = template_images.template_id
      and (t.status = 'published' or public.is_admin())
    )
  );

create policy "Admins can manage template images"
  on public.template_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- contact_submissions: anyone can insert, only admins can read/manage
-- ---------------------------------------------------------
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can view contact submissions"
  on public.contact_submissions for select
  using (public.is_admin());

create policy "Admins can manage contact submissions"
  on public.contact_submissions for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete contact submissions"
  on public.contact_submissions for delete
  using (public.is_admin());

-- ---------------------------------------------------------
-- template_inquiries: anyone can insert, only admins can read/manage
-- ---------------------------------------------------------
create policy "Anyone can submit template inquiry"
  on public.template_inquiries for insert
  with check (true);

create policy "Admins can view template inquiries"
  on public.template_inquiries for select
  using (public.is_admin());

create policy "Admins can manage template inquiries"
  on public.template_inquiries for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete template inquiries"
  on public.template_inquiries for delete
  using (public.is_admin());

-- ---------------------------------------------------------
-- testimonials: public read, admin write
-- ---------------------------------------------------------
create policy "Public can view testimonials"
  on public.testimonials for select
  using (true);

create policy "Admins can manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- settings: public read, admin write
-- ---------------------------------------------------------
create policy "Public can view settings"
  on public.settings for select
  using (true);

create policy "Admins can manage settings"
  on public.settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- activity_logs: admin only
-- ---------------------------------------------------------
create policy "Admins can view activity logs"
  on public.activity_logs for select
  using (public.is_admin());

create policy "Admins can insert activity logs"
  on public.activity_logs for insert
  with check (public.is_admin());

-- =========================================================
-- STORAGE BUCKETS
-- =========================================================

insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('template-images', 'template-images', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Public read access for all three buckets
create policy "Public read access for project-images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Public read access for template-images"
  on storage.objects for select
  using (bucket_id = 'template-images');

create policy "Public read access for site-assets"
  on storage.objects for select
  using (bucket_id = 'site-assets');

-- Admin write access
create policy "Admins can upload project-images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and public.is_admin());

create policy "Admins can update project-images"
  on storage.objects for update
  using (bucket_id = 'project-images' and public.is_admin());

create policy "Admins can delete project-images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and public.is_admin());

create policy "Admins can upload template-images"
  on storage.objects for insert
  with check (bucket_id = 'template-images' and public.is_admin());

create policy "Admins can update template-images"
  on storage.objects for update
  using (bucket_id = 'template-images' and public.is_admin());

create policy "Admins can delete template-images"
  on storage.objects for delete
  using (bucket_id = 'template-images' and public.is_admin());

create policy "Admins can upload site-assets"
  on storage.objects for insert
  with check (bucket_id = 'site-assets' and public.is_admin());

create policy "Admins can update site-assets"
  on storage.objects for update
  using (bucket_id = 'site-assets' and public.is_admin());

create policy "Admins can delete site-assets"
  on storage.objects for delete
  using (bucket_id = 'site-assets' and public.is_admin());

-- =========================================================
-- SEED DATA
-- =========================================================

-- Default settings row
insert into public.settings (agency_name, email, whatsapp, footer_text, seo_title, seo_description)
values (
  'Brodrick Web Design',
  'hello@brodrickwebdesign.com',
  '+2348000000000',
  '© 2026 Brodrick Web Design. All rights reserved.',
  'Brodrick Web Design — Premium Web Development Agency',
  'We design and build premium, high-converting websites and web applications for businesses that demand excellence.'
)
on conflict do nothing;

-- Service categories
insert into public.service_categories (name, slug, description, icon, sort_order) values
  ('Business Website Design', 'business-website-design', 'Professional websites that establish credibility and convert visitors into customers.', 'briefcase', 1),
  ('E-Commerce Websites', 'ecommerce-websites', 'Full-featured online stores built to sell, scale, and convert.', 'cart-shopping', 2),
  ('Landing Pages', 'landing-pages', 'High-converting, focused pages designed for campaigns and product launches.', 'rocket', 3),
  ('Website Redesign', 'website-redesign', 'Transform an outdated site into a modern, high-performing digital asset.', 'arrows-rotate', 4),
  ('SEO Optimization', 'seo-optimization', 'Technical and on-page SEO to help you rank and get found.', 'magnifying-glass-chart', 5),
  ('Website Maintenance', 'website-maintenance', 'Ongoing updates, monitoring, and support to keep your site running smoothly.', 'screwdriver-wrench', 6)
on conflict (slug) do nothing;

-- =========================================================
-- NOTES
-- =========================================================
-- 1. After running this script, create your first admin by:
--    a) Sign up a user via Supabase Auth (or the app's admin login flow)
--    b) Run: insert into public.admins (user_id) values ('<the-user-uuid>');
-- 2. Storage buckets are public for read access (images), but writes
--    require the user to be present in the admins table.
-- 3. RLS is enabled on all tables — server actions using the anon key
--    will respect these policies automatically.
