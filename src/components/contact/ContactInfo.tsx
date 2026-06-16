import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import FadeUp from "@/components/animations/FadeUp";
import type { Settings } from "@/types/database";

export default function ContactInfo({ settings }: { settings: Settings }) {
  const whatsappLink = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`
    : null;

  const socials = [
    { href: settings.facebook_url, icon: faFacebook, label: "Facebook" },
    { href: settings.instagram_url, icon: faInstagram, label: "Instagram" },
    { href: settings.linkedin_url, icon: faLinkedin, label: "LinkedIn" },
  ].filter((s) => s.href);

  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="rounded-3xl border border-border bg-background-secondary p-8">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="mt-6 space-y-5">
            {settings.email && (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Email</p>
                  <Link
                    href={`mailto:${settings.email}`}
                    className="text-sm font-medium hover:text-text-secondary"
                  >
                    {settings.email}
                  </Link>
                </div>
              </div>
            )}

            {whatsappLink && (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">WhatsApp</p>
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-text-secondary"
                  >
                    {settings.whatsapp}
                  </Link>
                </div>
              </div>
            )}

            {settings.phone && (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border">
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Phone</p>
                  <Link
                    href={`tel:${settings.phone}`}
                    className="text-sm font-medium hover:text-text-secondary"
                  >
                    {settings.phone}
                  </Link>
                </div>
              </div>
            )}

            {settings.address && (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Address</p>
                  <p className="text-sm font-medium">{settings.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeUp>

      {socials.length > 0 && (
        <FadeUp delay={0.1}>
          <div className="rounded-3xl border border-border bg-background-secondary p-8">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </Link>
              ))}
            </div>
          </div>
        </FadeUp>
      )}

      <FadeUp delay={0.2}>
        <div className="rounded-3xl border border-border bg-background-secondary p-8">
          <h3 className="text-lg font-semibold">Response Time</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            We typically respond to all inquiries within 24 hours. For urgent
            requests, reach out via WhatsApp for the fastest response.
          </p>
        </div>
      </FadeUp>
    </div>
  );
}
