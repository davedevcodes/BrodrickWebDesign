import Link from "next/link";
import Image from "next/image";
import type { Settings } from "@/types/database";

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="border-t border-border">
      <div className="container-custom flex flex-col items-center justify-between gap-6 py-12 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Image
            src="/logo.png"
            alt={settings.agency_name}
            width={140}
            height={40}
            className="h-14 rounded-lg w-auto object-contain"
          />
          <p className="text-sm text-text-secondary">{settings.footer_text}</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/portfolio" className="text-text-secondary hover:text-white">Portfolio</Link>
          <Link href="/templates" className="text-text-secondary hover:text-white">Templates</Link>
          <Link href="/contact" className="text-text-secondary hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
