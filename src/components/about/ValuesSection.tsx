import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGem,
  faBolt,
  faHandshake,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const values = [
  {
    icon: faGem,
    title: "Craftsmanship",
    description:
      "Every pixel, interaction, and line of code is considered. We don't ship anything we're not proud of.",
  },
  {
    icon: faBolt,
    title: "Speed & Performance",
    description:
      "We build for performance from the ground up — fast-loading sites that rank well and convert better.",
  },
  {
    icon: faHandshake,
    title: "Transparency",
    description:
      "Clear communication, honest timelines, and no surprises. You'll always know where your project stands.",
  },
  {
    icon: faChartLine,
    title: "Results-Driven",
    description:
      "We design with business outcomes in mind — every decision is made to help you grow.",
  },
];

export default function ValuesSection() {
  return (
    <section className="section-padding bg-background-secondary/30">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Values"
          title="What drives the way we work"
          description="These principles guide every project we take on — from the first conversation to final launch."
        />

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background-secondary text-lg">
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
