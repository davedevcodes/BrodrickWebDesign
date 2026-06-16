import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faSwatchbook,
  faEnvelope,
  faFileSignature,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/lib/supabase/server";
import StatCard from "@/components/admin/StatCard";
import {
  getDashboardStats,
  getRecentActivity,
  getRecentContactSubmissions,
} from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const activityVerbMap: Record<string, string> = {
  created: "created",
  updated: "updated",
  deleted: "deleted",
};

const entityLabelMap: Record<string, string> = {
  project: "project",
  template: "template",
  contact: "contact submission",
  settings: "settings",
  testimonial: "testimonial",
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const [stats, activity, recentContacts] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
    getRecentContactSubmissions(),
  ]);

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-text-secondary">
          Welcome back{userData.user?.email ? `, ${userData.user.email}` : ""}.
          Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={stats.totalProjects}
          icon={faBriefcase}
          href="/admin/projects"
        />
        <StatCard
          label="Total Templates"
          value={stats.totalTemplates}
          icon={faSwatchbook}
          href="/admin/templates"
        />
        <StatCard
          label="Contact Requests"
          value={stats.totalContactRequests}
          icon={faEnvelope}
          href="/admin/inquiries?tab=contacts"
          badge={stats.newContactRequests}
        />
        <StatCard
          label="Template Inquiries"
          value={stats.totalTemplateInquiries}
          icon={faFileSignature}
          href="/admin/inquiries?tab=templates"
          badge={stats.newTemplateInquiries}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent contact submissions */}
        <div className="rounded-3xl border border-border bg-background-secondary p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
            >
              View all
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

          {recentContacts.length === 0 ? (
            <p className="mt-6 text-sm text-text-secondary">No contact submissions yet.</p>
          ) : (
            <div className="mt-4 space-y-1">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{contact.name}</p>
                    <p className="truncate text-xs text-text-secondary">
                      {contact.service_needed || contact.email}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    {contact.status === "new" && (
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-black">
                        New
                      </span>
                    )}
                    <span className="text-xs text-text-secondary">
                      {formatRelativeTime(contact.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="rounded-3xl border border-border bg-background-secondary p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>

          {activity.length === 0 ? (
            <p className="mt-6 text-sm text-text-secondary">
              No activity recorded yet. Changes to projects, templates, and
              settings will appear here.
            </p>
          ) : (
            <div className="mt-4 space-y-1">
              {activity.map((log) => (
                <div key={log.id} className="flex items-center justify-between rounded-xl px-3 py-3">
                  <p className="truncate text-sm">
                    {log.description ||
                      `${activityVerbMap[log.action] || log.action} ${
                        entityLabelMap[log.entity_type] || log.entity_type
                      }`}
                  </p>
                  <span className="flex-shrink-0 text-xs text-text-secondary">
                    {formatRelativeTime(log.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-between rounded-2xl border border-border bg-background-secondary p-5 transition-colors hover:border-white/30"
        >
          <span className="text-sm font-medium">Add New Project</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs text-text-secondary" />
        </Link>
        <Link
          href="/admin/templates/new"
          className="flex items-center justify-between rounded-2xl border border-border bg-background-secondary p-5 transition-colors hover:border-white/30"
        >
          <span className="text-sm font-medium">Add New Template</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs text-text-secondary" />
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center justify-between rounded-2xl border border-border bg-background-secondary p-5 transition-colors hover:border-white/30"
        >
          <span className="text-sm font-medium">Edit Site Settings</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs text-text-secondary" />
        </Link>
      </div>
    </div>
  );
}
