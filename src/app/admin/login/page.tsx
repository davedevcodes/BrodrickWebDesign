import Image from "next/image";
import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import AnimatedAuthCard from "@/components/admin/AnimatedAuthCard";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <AnimatedAuthCard>
        <div className="text-center">
          <Image
            src="/logo.png"
            alt={settings.agency_name}
            width={140}
            height={40}
            className="mx-auto h-9 w-auto object-contain"
          />
          <h1 className="mt-4 text-3xl font-bold text-black">Admin Login</h1>
          <p className="mt-2 text-sm text-black/60">
            Sign in to manage projects, templates, and inquiries.
          </p>
        </div>

        <div className="mt-8">
          <LoginForm unauthorized={error === "unauthorized"} />
        </div>
      </AnimatedAuthCard>
    </div>
  );
}
