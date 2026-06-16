import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FadeUp from "@/components/animations/FadeUp";
import Button from "@/components/ui/Button";
import { getProjectBySlug, getProjectImages, getAllProjectSlugs } from "@/lib/data/projects";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description || undefined,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.featured_image ? [project.featured_image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = project.id ? await getProjectImages(project.id) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Organization",
      name: "Forge Studio",
    },
    about: project.client_name,
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
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              Back to Portfolio
            </Link>
          </FadeUp>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <FadeUp delay={0.1}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  {project.category}
                </span>
              </FadeUp>
              <FadeUp delay={0.15}>
                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
                  {project.title}
                </h1>
              </FadeUp>
              {project.client_name && (
                <FadeUp delay={0.2}>
                  <p className="mt-4 text-text-secondary">
                    Client: <span className="text-white">{project.client_name}</span>
                  </p>
                </FadeUp>
              )}
            </div>

            {project.live_url && (
              <FadeUp delay={0.25}>
                <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">
                    Visit Live Site
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                  </Button>
                </Link>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section className="border-b border-border">
        <div className="container-custom py-12">
          <FadeUp>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-background-secondary">
              {project.featured_image ? (
                <Image
                  src={project.featured_image}
                  alt={project.title || "Project"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-text-secondary">
                  Image coming soon
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FadeUp>
              <h2 className="text-2xl font-bold sm:text-3xl">About this project</h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                {project.description}
              </p>
            </FadeUp>

            {project.results && (
              <FadeUp delay={0.1} className="mt-10">
                <h2 className="text-2xl font-bold sm:text-3xl">Results</h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                  {project.results}
                </p>
              </FadeUp>
            )}

            {/* Gallery */}
            {images.length > 0 && (
              <FadeUp delay={0.15} className="mt-10">
                <h2 className="text-2xl font-bold sm:text-3xl">Gallery</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-background-secondary"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || project.title || "Project image"}
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
                  Project Details
                </h3>

                <dl className="mt-6 space-y-6">
                  <div>
                    <dt className="text-sm text-text-secondary">Category</dt>
                    <dd className="mt-1 font-medium">{project.category}</dd>
                  </div>

                  {project.client_name && (
                    <div>
                      <dt className="text-sm text-text-secondary">Client</dt>
                      <dd className="mt-1 font-medium">{project.client_name}</dd>
                    </div>
                  )}

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div>
                      <dt className="text-sm text-text-secondary">Technologies</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-3 py-1 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {project.live_url && (
                    <div>
                      <dt className="text-sm text-text-secondary">Live Website</dt>
                      <dd className="mt-1">
                        <Link
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-white hover:text-text-secondary"
                        >
                          {project.live_url.replace(/^https?:\/\//, "")}
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                        </Link>
                      </dd>
                    </div>
                  )}

                  {project.case_study_url && (
                    <div>
                      <dt className="text-sm text-text-secondary">Case Study</dt>
                      <dd className="mt-1">
                        <Link
                          href={project.case_study_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-white hover:text-text-secondary"
                        >
                          View case study
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-6">
              <div className="rounded-3xl border border-border bg-background-secondary p-8 text-center">
                <h3 className="text-lg font-semibold">Have a similar project?</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Let&apos;s talk about how we can help bring your vision to life.
                </p>
                <Link href="/contact" className="mt-6 inline-block">
                  <Button variant="primary">
                    Start Your Project
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}
