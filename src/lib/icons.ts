import {
  faBriefcase,
  faCartShopping,
  faRocket,
  faArrowsRotate,
  faMagnifyingGlassChart,
  faScrewdriverWrench,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const serviceIconMap: Record<string, IconDefinition> = {
  briefcase: faBriefcase,
  "cart-shopping": faCartShopping,
  rocket: faRocket,
  "arrows-rotate": faArrowsRotate,
  "magnifying-glass-chart": faMagnifyingGlassChart,
  "screwdriver-wrench": faScrewdriverWrench,
};

export function getServiceIcon(icon: string | null): IconDefinition {
  return serviceIconMap[icon ?? ""] ?? faBriefcase;
}
