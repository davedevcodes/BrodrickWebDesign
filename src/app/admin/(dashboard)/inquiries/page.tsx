import type { Metadata } from "next";
import InquiriesTabs from "@/components/admin/InquiriesTabs";
import { getContactSubmissions, getTemplateInquiries } from "@/lib/data/inquiries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

interface InquiriesPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { tab } = await searchParams;
  const [contacts, templateInquiries] = await Promise.all([
    getContactSubmissions(),
    getTemplateInquiries(),
  ]);

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-bold">Inquiries</h1>
      <p className="mt-1 text-text-secondary">
        View and manage contact form submissions and template selection requests.
      </p>

      <div className="mt-8">
        <InquiriesTabs
          contacts={contacts}
          templateInquiries={templateInquiries}
          initialTab={tab === "templates" ? "templates" : "contacts"}
        />
      </div>
    </div>
  );
}
