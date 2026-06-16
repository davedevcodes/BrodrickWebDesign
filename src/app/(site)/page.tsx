import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import TemplatesPreview from "@/components/sections/TemplatesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactCTA from "@/components/sections/ContactCTA";
import {
  getFeaturedProjects,
  getFeaturedTemplates,
  getTestimonials,
  getServiceCategories,
} from "@/lib/data/home";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [services, projects, templates, testimonials, settings] = await Promise.all([
    getServiceCategories(),
    getFeaturedProjects(),
    getFeaturedTemplates(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.agency_name,
    url: siteUrl,
    logo: settings.logo_url || `${siteUrl}/logo.png`,
    email: settings.email || undefined,
    sameAs: [
      settings.facebook_url,
      settings.instagram_url,
      settings.linkedin_url,
      settings.twitter_url,
    ].filter(Boolean),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.agency_name,
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <ServicesSection services={services} />
      <PortfolioPreview projects={projects} />
      <TemplatesPreview templates={templates} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA settings={settings} />
    </>
  );
}
