import { notFound } from "next/navigation";
import { NumberCard } from "@/components/NumberCard";
import { PageHeader } from "@/components/PageHeader";
import { getNumbersByRange } from "@/lib/content";

type NumberRangePageProps = {
  params: Promise<{ range: string }>;
};

export default async function NumberRangePage({ params }: NumberRangePageProps) {
  const { range } = await params;
  const numbers = getNumbersByRange(range);

  if (!numbers.length) {
    notFound();
  }

  return (
    <main
      className="app-shell fade-in"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 235, 151, 0.92), rgba(255, 249, 230, 0.96))"
      }}
    >
      <PageHeader title="数字启蒙" subtitle={range} />
      <NumberCard numbers={numbers} />
    </main>
  );
}
