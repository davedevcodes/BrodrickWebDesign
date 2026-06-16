export const PROJECT_CATEGORIES = [
  "All",
  "Business Website Design",
  "E-Commerce Websites",
  "Landing Pages",
  "Website Redesign",
  "SEO Optimization",
  "Website Maintenance",
] as const;

export const TEMPLATE_CATEGORIES = PROJECT_CATEGORIES;

export function formatNaira(min?: number | null, max?: number | null) {
  if (!min && !max) return "Custom pricing";
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
  if (min && max) return `${formatter.format(min)} – ${formatter.format(max)}`;
  return formatter.format(min || max || 0);
}
