import type { Metadata } from "next";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PageHeader from "@/components/ui/PageHeader";
import { getAllProjects } from "@/lib/data/projects";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of premium websites and web applications built for businesses across industries.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Projects we're proud of"
        description="A collection of websites and web applications we've designed and built for clients across industries — each one crafted to perform as good as it looks."
      />

      <section className="section-padding bg-background pt-0 sm:pt-0">
        <div className="container-custom">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
