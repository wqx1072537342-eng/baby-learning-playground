import Image from "next/image";
import { BigButton } from "@/components/BigButton";
import { FeatureStrip } from "@/components/FeatureStrip";
import { PageHeader } from "@/components/PageHeader";
import { numberRanges } from "@/lib/content";

export default function NumbersPage() {
  return (
    <main
      className="app-shell fade-in"
      style={{
        background:
          "linear-gradient(180deg, rgba(70, 190, 255, 0.9), rgba(206, 243, 142, 0.82))"
      }}
    >
      <PageHeader title="学数字" subtitle="从 0 到 100 轻松学" />

      <section className="range-stack">
        {numberRanges.map((range) => (
          <BigButton
            className="range-card"
            href={range.href}
            key={range.href}
            style={{ background: range.color }}
          >
            <span className="range-mascot">
              <Image src={range.image} alt="" width={72} height={72} />
            </span>
            <span>
              <strong>{range.title}</strong>
              <b>{range.range}</b>
            </span>
            <span className="range-arrow">›</span>
          </BigButton>
        ))}
      </section>

      <FeatureStrip />
    </main>
  );
}
