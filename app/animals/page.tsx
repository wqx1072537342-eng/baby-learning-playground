import { PageHeader } from "@/components/PageHeader";
import { QuestionCard } from "@/components/QuestionCard";
import { getAnimalQuestions } from "@/lib/content";

export default function AnimalsPage() {
  return (
    <main
      className="app-shell fade-in"
      style={{
        background:
          "linear-gradient(180deg, rgba(184, 143, 255, 0.92), rgba(243, 222, 255, 0.96))"
      }}
    >
      <PageHeader title="数动物" subtitle="有几只小动物呢？" />
      <QuestionCard questions={getAnimalQuestions()} theme="animals" />
    </main>
  );
}
