import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import StatsSection from "@/components/about/StatsSection";
import ValuesSection from "@/components/about/ValuesSection";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import ContactCTA from "@/components/sections/ContactCTA";
import FadeUp from "@/components/animations/FadeUp";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Forge Studio — our story, mission, values, and the process behind every premium website we build.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="We build digital experiences that move businesses forward"
        description={`${settings.agency_name} is a web development studio focused on premium design, fast performance, and measurable results for ambitious brands.`}
      />

      {/* Story & Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeUp>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {settings.agency_name} started with a simple frustration: too many
              businesses were stuck with slow, outdated websites that didn&apos;t
              reflect the quality of what they actually offered. We set out to
              change that — building websites that look as good as they perform,
              for businesses that are serious about growth.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Today, we work with founders, local businesses, and growing brands
              to design and build websites and web applications that don&apos;t
              just look impressive — they generate leads, drive sales, and build
              trust from the first visit.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              To give every business — regardless of size — access to the kind
              of premium, high-converting digital presence that was once
              reserved for large brands with big budgets.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              We measure success not by how a website looks in a portfolio, but
              by the inquiries, sales, and growth it brings to the businesses we
              work with.
            </p>
          </FadeUp>
        </div>
      </section>

      <StatsSection />
      <ValuesSection />
      <ProcessTimeline />
      <WhyChooseUs />
      <ContactCTA settings={settings} />
    </>
  );
}
