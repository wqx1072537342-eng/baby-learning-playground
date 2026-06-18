import { notFound } from "next/navigation";
import { NumberCard } from "@/components/NumberCard";
import { PageHeader } from "@/components/PageHeader";
import { getNumbersByRange, getAllNumberRanges } from "@/lib/content"; // ✅ 导入新函数

export async function generateStaticParams() {
  const ranges = getAllNumberRanges(); // 获取 ["0-10", "11-50", "50-100"]
  return ranges.map((range) => ({
    range: range, // 参数名与文件夹名 [range] 一致
  }));
}

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
