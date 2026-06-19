import { createPublicClient } from "@/lib/supabase/server";
import type { Project, Template, Testimonial, ServiceCategory } from "@/types/database";

export const FALLBACK_SERVICES: Pick<ServiceCategory, "name" | "slug" | "description" | "icon">[] = [
  {
    name: "Business Website Design",
    slug: "business-website-design",
    description: "Professional websites that establish credibility and convert visitors into customers.",
    icon: "briefcase",
  },
  {
    name: "E-Commerce Websites",
    slug: "ecommerce-websites",
    description: "Full-featured online stores built to sell, scale, and convert.",
    icon: "cart-shopping",
  },
  {
    name: "Landing Pages",
    slug: "landing-pages",
    description: "High-converting, focused pages designed for campaigns and product launches.",
    icon: "rocket",
  },
  {
    name: "Website Redesign",
    slug: "website-redesign",
    description: "Transform an outdated site into a modern, high-performing digital asset.",
    icon: "arrows-rotate",
  },
  {
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "Technical and on-page SEO to help you rank and get found.",
    icon: "magnifying-glass-chart",
  },
  {
    name: "Website Maintenance",
    slug: "website-maintenance",
    description: "Ongoing updates, monitoring, and support to keep your site running smoothly.",
    icon: "screwdriver-wrench",
  },
];

export const FALLBACK_PROJECTS: Partial<Project>[] = [
  {
    id: "fallback-1",
    title: "Lumière Studio",
    slug: "lumiere-studio",
    category: "Business Website Design",
    description: "A premium photography portfolio with cinematic galleries and smooth transitions.",
    featured_image: "/images/placeholder-project-1.jpg",
    client_name: "Lumière Studio",
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "fallback-2",
    title: "TradeX Academy",
    slug: "tradex-academy",
    category: "E-Commerce Websites",
    description: "A full-stack trading simulation platform with live market data and admin tools.",
    featured_image: "/images/placeholder-project-2.jpg",
    client_name: "TradeX",
    tech_stack: ["Next.js", "Express", "MongoDB"],
  },
  {
    id: "fallback-3",
    title: "The Blade Room",
    slug: "the-blade-room",
    category: "Landing Pages",
    description: "A sharp, modern landing page for a premium barbershop brand.",
    featured_image: "/images/placeholder-project-3.jpg",
    client_name: "The Blade Room",
    tech_stack: ["Next.js", "Tailwind CSS"],
  },
];

export const FALLBACK_TEMPLATES: Partial<Template>[] = [
  {
    id: "fallback-t1",
    title: "Apex Business",
    slug: "apex-business",
    category: "Business Website Design",
    description: "A clean, corporate template for service businesses and consultancies.",
    featured_image: "/images/placeholder-template-1.jpg",
    price_min: 250000,
    price_max: 450000,
    features: ["Responsive design", "Contact form", "SEO ready", "CMS integration"],
  },
  {
    id: "fallback-t2",
    title: "Storefront Pro",
    slug: "storefront-pro",
    category: "E-Commerce Websites",
    description: "A conversion-optimized template for online stores and product catalogs.",
    featured_image: "/images/placeholder-template-2.jpg",
    price_min: 400000,
    price_max: 750000,
    features: ["Product catalog", "Cart & checkout", "Payment integration", "Admin dashboard"],
  },
  {
    id: "fallback-t3",
    title: "Launch Page",
    slug: "launch-page",
    category: "Landing Pages",
    description: "A high-impact single page template built for product launches and campaigns.",
    featured_image: "/images/placeholder-template-3.jpg",
    price_min: 150000,
    price_max: 300000,
    features: ["Animated sections", "Lead capture", "A/B test ready", "Fast loading"],
  },
];

export const FALLBACK_TESTIMONIALS: Partial<Testimonial>[] = [
  {
    id: "fallback-test-1",
    client_name: "Adaeze Okonjo",
    client_role: "Founder",
    client_company: "Evertidy Laundry Services",
    content:
      "The team delivered a website that completely transformed how customers perceive our brand. Bookings increased within the first month.",
    rating: 5,
  },
  {
    id: "fallback-test-2",
    client_name: "Michael Chen",
    client_role: "Director",
    client_company: "TradeX Academy",
    content:
      "Professional, fast, and incredibly detail-oriented. They understood our vision and executed it better than we imagined.",
    rating: 5,
  },
  {
    id: "fallback-test-3",
    client_name: "Sarah Williams",
    client_role: "Owner",
    client_company: "Sweet Crumbs Bakery",
    content:
      "Our new site looks like it belongs to a global brand. The design, speed, and attention to detail exceeded expectations.",
    rating: 5,
  },
];

export async function getFeaturedProjects(): Promise<Partial<Project>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .limit(3);

    if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
    return data;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getFeaturedTemplates(): Promise<Partial<Template>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .limit(3);

    if (error || !data || data.length === 0) return FALLBACK_TEMPLATES;
    return data;
  } catch {
    return FALLBACK_TEMPLATES;
  }
}

export async function getTestimonials(): Promise<Partial<Testimonial>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error || !data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getServiceCategories(): Promise<
  Pick<ServiceCategory, "name" | "slug" | "description" | "icon">[]
> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("service_categories")
      .select("name, slug, description, icon")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_SERVICES;
    return data;
  } catch {
    return FALLBACK_SERVICES;
  }
}
