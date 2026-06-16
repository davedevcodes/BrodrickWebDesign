import clsx from "clsx";
import FadeUp from "@/components/animations/FadeUp";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <FadeUp>
          <span
            className={clsx(
              "text-xs font-semibold uppercase tracking-[0.2em]",
              light ? "text-black/50" : "text-text-secondary"
            )}
          >
            {eyebrow}
          </span>
        </FadeUp>
      )}
      <FadeUp delay={0.1}>
        <h2
          className={clsx(
            "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl",
            light ? "text-black" : "text-white",
            align === "center" ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {title}
        </h2>
      </FadeUp>
      {description && (
        <FadeUp delay={0.2}>
          <p
            className={clsx(
              "max-w-2xl text-base sm:text-lg",
              light ? "text-black/60" : "text-text-secondary"
            )}
          >
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
