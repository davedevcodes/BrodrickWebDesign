import type { Metadata } from "next";
import TemplatesGrid from "@/components/templates/TemplatesGrid";
import PageHeader from "@/components/ui/PageHeader";
import { getAllTemplates } from "@/lib/data/templates";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Website Templates",
  description:
    "Browse premium, ready-made website templates and choose your starting point — we'll customize it to fit your brand.",
  alternates: { canonical: "/templates" },
};

export default async function TemplatesPage() {
  const templates = await getAllTemplates();

  return (
    <>
      <PageHeader
        eyebrow="Website Templates"
        title="Pick a design, make it yours"
        description="Browse our collection of premium templates across every category. Select one as your starting point and we'll fully customize it to match your brand."
      />

      <section className="section-padding bg-background pt-0 sm:pt-0">
        <div className="container-custom">
          <TemplatesGrid templates={templates} />
        </div>
      </section>
    </>
  );
}
