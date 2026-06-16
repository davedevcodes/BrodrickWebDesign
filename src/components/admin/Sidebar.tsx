"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBriefcase,
  faSwatchbook,
  faEnvelope,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import clsx from "clsx";
import { signOut } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: faGauge },
  { href: "/admin/projects", label: "Projects", icon: faBriefcase },
  { href: "/admin/templates", label: "Templates", icon: faSwatchbook },
  { href: "/admin/inquiries", label: "Inquiries", icon: faEnvelope },
  { href: "/admin/settings", label: "Settings", icon: faGear },
];

export default function Sidebar({ agencyName }: { agencyName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden">
        <Image src="/logo.png" alt={agencyName} width={120} height={32} className="h-7 w-auto object-contain invert" />
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background-secondary transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="hidden h-20 items-center px-6 lg:flex">
          <Image src="/logo.png" alt={agencyName} width={140} height={40} className="h-8 w-auto object-contain invert" />
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 lg:py-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-white text-black"
                  : "text-text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="w-4 text-sm" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4 text-sm" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
