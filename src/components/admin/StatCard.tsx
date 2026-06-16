import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: number;
  icon: IconDefinition;
  href?: string;
  badge?: number;
}

export default function StatCard({ label, value, icon, href, badge }: StatCardProps) {
  const content = (
    <div className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-background-secondary p-6 transition-colors hover:border-white/30">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-lg">
          <FontAwesomeIcon icon={icon} />
        </div>
        {!!badge && badge > 0 && (
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-black">
            {badge} new
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        <p className="mt-1 text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
