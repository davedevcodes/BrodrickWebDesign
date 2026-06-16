import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings?.seo_title || `${settings?.agency_name || "Brodrick Web Design"} — Premium Web Development Agency`;
  const description =
    settings?.seo_description ||
    "We design and build premium, high-converting websites and web applications for businesses that demand excellence.";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
    title: {
      default: title,
      template: `%s | ${settings?.agency_name || "Brodrick Web Design"}`,
    },
    description,
    keywords: ["web design agency", "web development", "Next.js development", "premium websites", "e-commerce development"],
    openGraph: {
      title,
      description,
      type: "website",
      siteName: settings?.agency_name || "Brodrick Web Design",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text-primary antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
