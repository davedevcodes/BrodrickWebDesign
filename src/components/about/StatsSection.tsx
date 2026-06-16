import AnimatedCounter from "@/components/animations/AnimatedCounter";
import FadeUp from "@/components/animations/FadeUp";

const stats = [
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-border bg-background-secondary/30">
      <div className="container-custom grid grid-cols-2 gap-8 py-16 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
            <p className="text-4xl font-bold sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
