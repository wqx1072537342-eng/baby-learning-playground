"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { playSound } from "@/lib/audio";
import { nextIndex, shuffle } from "@/lib/question";
import { speak } from "@/lib/speech";
import type { PlayQuestion } from "@/lib/types";
import { FeedbackBubble } from "./FeedbackBubble";
import { OptionButton } from "./OptionButton";

type QuestionCardProps = {
  questions: PlayQuestion[];
  theme: "animals" | "fruits";
};

export function QuestionCard({ questions, theme }: QuestionCardProps) {
  const [orderedQuestions] = useState(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const current = orderedQuestions[index];
  const options = useMemo(() => shuffle(current?.options ?? []), [current]);

  useEffect(() => {
    if (current) {
      setFeedback("");
      setState("idle");
      setLocked(false);
      const timer = window.setTimeout(() => speak(`${current.prompt}呢？`), 260);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [current]);

  if (!current) {
    return <div className="feedback">题目还在准备中</div>;
  }

  const goNext = () => {
    setIndex((value) => nextIndex(value, orderedQuestions.length));
  };

  const handleChoose = (answer: number) => {
    if (locked) return;

    if (answer === current.count) {
      setLocked(true);
      setState("correct");
      setFeedback(theme === "animals" ? `答对啦！${current.count}` : `太棒啦！${current.count}`);
      setScore((value) => value + 1);
      playSound("success");
      window.setTimeout(() => playSound("reward"), 180);
      speak(current.successSpeech);
    } else {
      setState("wrong");
      setFeedback("再试一次哦");
      playSound("wrong");
      speak("再试一次哦");
      window.setTimeout(() => setState("idle"), 480);
    }
  };

  return (
    <section className="question-card">
      <div className={`quiz-visual ${state === "correct" ? "bounce" : ""}`}>
        {Array.from({ length: current.count }).map((_, itemIndex) => (
          <span className="item-image-wrap" key={`${current.id}-${itemIndex}`}>
            <Image
              className="item-image"
              src={current.item.image}
              alt={current.item.name}
              width={72}
              height={72}
            />
          </span>
        ))}
      </div>
      <h2 className="question-text">{current.prompt}</h2>
      <div className="options-grid">
        {options.map((option, optionIndex) => (
          <OptionButton
            className={state === "wrong" ? "shake" : ""}
            disabled={locked}
            index={optionIndex}
            key={option}
            label={String(option)}
            onChoose={() => handleChoose(option)}
          />
        ))}
      </div>
      <FeedbackBubble message={feedback || `第 ${index + 1} 题 · 已答对 ${score} 题`} />
      {locked ? (
        <button
          className="pill-button"
          style={{
            width: "100%",
            marginTop: 14,
            background: "linear-gradient(180deg, #ffbe42, #ff8f21)"
          }}
          onClick={() => {
            playSound("click");
            goNext();
          }}
        >
          下一题
        </button>
      ) : null}
    </section>
  );
}
