"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { playClick, playSound } from "@/lib/audio";
import { nextIndex, shuffle } from "@/lib/question";
import { speak } from "@/lib/speech";
import type { ColorPlayQuestion } from "@/lib/types";
import { FeedbackBubble } from "./FeedbackBubble";

type ColorGameProps = {
  questions: ColorPlayQuestion[];
};

export function ColorGame({ questions }: ColorGameProps) {
  const [orderedQuestions] = useState(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [chosenId, setChosenId] = useState("");
  const [locked, setLocked] = useState(false);
  const current = orderedQuestions[index];
  const options = useMemo(() => shuffle(current?.options ?? []), [current]);

  useEffect(() => {
    if (current) {
      setFeedback("");
      setState("idle");
      setChosenId("");
      setLocked(false);
      const timer = window.setTimeout(() => speak(current.prompt), 260);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [current]);

  if (!current) {
    return <div className="feedback">颜色题还在准备中</div>;
  }

  const chooseColor = (colorId: string) => {
    if (locked) return;

    playClick();
    setChosenId(colorId);
    if (colorId === current.answer.id) {
      setLocked(true);
      setState("correct");
      setFeedback(`答对啦，这是${current.answer.name}！`);
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
      <h2 className="question-text">{current.prompt}</h2>
      <div className="color-grid">
        {options.map((option) => {
          const isChosen = chosenId === option.id;
          return (
            <button
              aria-label={option.name}
              className={`color-button ${
                isChosen && state === "correct" ? "pop" : ""
              } ${isChosen && state === "wrong" ? "shake" : ""}`}
              disabled={locked}
              key={option.id}
              style={{ background: option.hex }}
              onClick={() => chooseColor(option.id)}
            >
              <Image className="color-image" src={option.image} alt="" width={92} height={92} />
            </button>
          );
        })}
      </div>
      <FeedbackBubble message={feedback || `第 ${index + 1} 题`} />
      {locked ? (
        <button
          className="pill-button"
          style={{
            width: "100%",
            marginTop: 14,
            background: "linear-gradient(180deg, #8ee34a, #61c62c)"
          }}
          onClick={() => {
            playClick();
            setIndex((value) => nextIndex(value, orderedQuestions.length));
          }}
        >
          下一题
        </button>
      ) : null}
    </section>
  );
}
