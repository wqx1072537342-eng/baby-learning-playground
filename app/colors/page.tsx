import { ColorGame } from "@/components/ColorGame";
import { PageHeader } from "@/components/PageHeader";
import { getColorQuestions } from "@/lib/content";

export default function ColorsPage() {
  return (
    <main
      className="app-shell fade-in"
      style={{
        background:
          "linear-gradient(180deg, rgba(183, 233, 119, 0.92), rgba(235, 255, 211, 0.96))"
      }}
    >
      <PageHeader title="认识颜色" subtitle="哪个是这个颜色？" />
      <ColorGame questions={getColorQuestions()} />
    </main>
  );
}
