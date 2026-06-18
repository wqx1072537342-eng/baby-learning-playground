import { PageHeader } from "@/components/PageHeader";
import { QuestionCard } from "@/components/QuestionCard";
import { getFruitQuestions } from "@/lib/content";

export default function FruitsPage() {
  return (
    <main
      className="app-shell fade-in"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 150, 178, 0.92), rgba(255, 224, 229, 0.96))"
      }}
    >
      <PageHeader title="数水果" subtitle="数一数，有几个水果呢？" />
      <QuestionCard questions={getFruitQuestions()} theme="fruits" />
    </main>
  );
}
