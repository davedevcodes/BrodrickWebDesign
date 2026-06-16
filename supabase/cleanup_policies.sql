-- Run this first if you're re-running schema.sql and get
-- "policy already exists" errors. This drops all policies
-- created by schema.sql so it can be safely re-run.

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

drop policy if exists "Admins can view admin list" on public.admins;

drop policy if exists "Public can view service categories" on public.service_categories;
drop policy if exists "Admins can manage service categories" on public.service_categories;

drop policy if exists "Public can view published projects" on public.projects;
drop policy if exists "Admins can manage projects" on public.projects;

drop policy if exists "Public can view project images" on public.project_images;
drop policy if exists "Admins can manage project images" on public.project_images;

drop policy if exists "Public can view published templates" on public.templates;
drop policy if exists "Admins can manage templates" on public.templates;

drop policy if exists "Public can view template images" on public.template_images;
drop policy if exists "Admins can manage template images" on public.template_images;

drop policy if exists "Anyone can submit contact form" on public.contact_submissions;
drop policy if exists "Admins can view contact submissions" on public.contact_submissions;
drop policy if exists "Admins can manage contact submissions" on public.contact_submissions;
drop policy if exists "Admins can delete contact submissions" on public.contact_submissions;

drop policy if exists "Anyone can submit template inquiry" on public.template_inquiries;
drop policy if exists "Admins can view template inquiries" on public.template_inquiries;
drop policy if exists "Admins can manage template inquiries" on public.template_inquiries;
drop policy if exists "Admins can delete template inquiries" on public.template_inquiries;

drop policy if exists "Public can view testimonials" on public.testimonials;
drop policy if exists "Admins can manage testimonials" on public.testimonials;

drop policy if exists "Public can view settings" on public.settings;
drop policy if exists "Admins can manage settings" on public.settings;

drop policy if exists "Admins can view activity logs" on public.activity_logs;
drop policy if exists "Admins can insert activity logs" on public.activity_logs;

-- Storage policies
drop policy if exists "Public read access for project-images" on storage.objects;
drop policy if exists "Public read access for template-images" on storage.objects;
drop policy if exists "Public read access for site-assets" on storage.objects;
drop policy if exists "Admins can upload project-images" on storage.objects;
drop policy if exists "Admins can update project-images" on storage.objects;
drop policy if exists "Admins can delete project-images" on storage.objects;
drop policy if exists "Admins can upload template-images" on storage.objects;
drop policy if exists "Admins can update template-images" on storage.objects;
drop policy if exists "Admins can delete template-images" on storage.objects;
drop policy if exists "Admins can upload site-assets" on storage.objects;
drop policy if exists "Admins can update site-assets" on storage.objects;
drop policy if exists "Admins can delete site-assets" on storage.objects;
