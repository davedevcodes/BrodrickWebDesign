import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FadeUp from "@/components/animations/FadeUp";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your project. We typically respond within 24 hours with a free consultation.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about your project"
        description="Fill out the form below and tell us a bit about what you're looking to build. We'll get back to you within 24 hours with next steps."
      />

      <section className="section-padding bg-background pt-10">
        <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FadeUp>
              <div className="rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
                <ContactForm />
              </div>
            </FadeUp>
          </div>

          <div>
            <ContactInfo settings={settings} />
          </div>
        </div>
      </section>
    </>
  );
}
