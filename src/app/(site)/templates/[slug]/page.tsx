import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import FadeUp from "@/components/animations/FadeUp";
import Button from "@/components/ui/Button";
import TemplateInquiryForm from "@/components/templates/TemplateInquiryForm";
import { getTemplateBySlug, getTemplateImages, getAllTemplateSlugs } from "@/lib/data/templates";
import { formatNaira } from "@/lib/constants";

export const revalidate = 3600;

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTemplateSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    return { title: "Template Not Found" };
  }

  return {
    title: template.title,
    description: template.description || undefined,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: template.title,
      description: template.description || undefined,
      images: template.featured_image ? [template.featured_image] : undefined,
    },
  };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const images = template.id ? await getTemplateImages(template.id) : [];
  const galleryImages = images.length > 0
    ? images
    : template.featured_image
      ? [{ id: "featured", image_url: template.featured_image, alt_text: template.title }]
      : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: template.title,
    description: template.description,
    category: template.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "NGN",
      lowPrice: template.price_min,
      highPrice: template.price_max,
    },
  };

  return (
    <article className="bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="border-b border-border pb-16 pt-44 sm:pt-52">
        <div className="container-custom">
          <FadeUp>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              Back to Templates
            </Link>
          </FadeUp>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <FadeUp delay={0.1}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  {template.category}
                </span>
              </FadeUp>
              <FadeUp delay={0.15}>
                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
                  {template.title}
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-4 text-lg font-semibold text-white">
                  {formatNaira(template.price_min, template.price_max)}
                </p>
              </FadeUp>
            </div>

            {template.demo_url && (
              <FadeUp delay={0.25}>
                <Link href={template.demo_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">
                    View Live Demo
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                  </Button>
                </Link>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {template.featured_image && (
        <section className="border-b border-border">
          <div className="container-custom py-12">
            <FadeUp>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-background-secondary">
                <Image
                  src={template.featured_image}
                  alt={template.title || "Template"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Details */}
      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FadeUp>
              <h2 className="text-2xl font-bold sm:text-3xl">About this template</h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                {template.description}
              </p>
            </FadeUp>

            {template.features && template.features.length > 0 && (
              <FadeUp delay={0.1} className="mt-10">
                <h2 className="text-2xl font-bold sm:text-3xl">What&apos;s included</h2>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {template.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background-secondary px-4 py-3"
                    >
                      <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <FadeUp delay={0.15} className="mt-10">
                <h2 className="text-2xl font-bold sm:text-3xl">Gallery</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-background-secondary"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || template.title || "Template image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <FadeUp delay={0.1}>
              <div className="rounded-3xl border border-border bg-background-secondary p-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-text-secondary">
                  Template Details
                </h3>

                <dl className="mt-6 space-y-6">
                  <div>
                    <dt className="text-sm text-text-secondary">Category</dt>
                    <dd className="mt-1 font-medium">{template.category}</dd>
                  </div>

                  <div>
                    <dt className="text-sm text-text-secondary">Price Range</dt>
                    <dd className="mt-1 font-medium">
                      {formatNaira(template.price_min, template.price_max)}
                    </dd>
                  </div>

                  {template.demo_url && (
                    <div>
                      <dt className="text-sm text-text-secondary">Live Demo</dt>
                      <dd className="mt-1">
                        <Link
                          href={template.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-white hover:text-text-secondary"
                        >
                          {template.demo_url.replace(/^https?:\/\//, "")}
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-6">
              <TemplateInquiryForm
                templateId={template.id || ""}
                templateTitle={template.title || "this template"}
              />
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}
