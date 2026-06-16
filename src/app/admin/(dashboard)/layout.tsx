import Sidebar from "@/components/admin/Sidebar";
import { getSiteSettings } from "@/lib/settings";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar agencyName={settings.agency_name} />
      <div className="lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
