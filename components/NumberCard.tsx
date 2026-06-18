"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { playClick, playSound } from "@/lib/audio";
import { speak } from "@/lib/speech";
import type { NumberItem } from "@/lib/types";

type NumberCardProps = {
  numbers: NumberItem[];
};

export function NumberCard({ numbers }: NumberCardProps) {
  const [index, setIndex] = useState(0);
  const [popKey, setPopKey] = useState(0);
  const current = numbers[index];

  useEffect(() => {
    if (current) {
      const timer = window.setTimeout(() => speak(current.speech), 260);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [current]);

  const progress = useMemo(() => `${index + 1} / ${numbers.length}`, [index, numbers.length]);

  if (!current) {
    return <div className="feedback">这个数字阶段还没有内容哦</div>;
  }

  return (
    <section className="learning-card">
      <div key={`${current.value}-${popKey}`} className="number-display pop">
        <Image
          className="number-deco number-deco-left"
          src="/assets/icons/cloud.png"
          alt=""
          width={82}
          height={58}
        />
        <Image
          className="number-deco number-deco-right"
          src="/assets/icons/star.png"
          alt=""
          width={58}
          height={58}
        />
        <div>
          <div className="big-number">{current.value}</div>
          <div className="number-text">{current.text}</div>
        </div>
      </div>
      <div className="feedback">第 {progress} 张</div>
      <div className="action-row">
        <button
          className="pill-button"
          style={{ background: "linear-gradient(180deg, #61d4ff, #239ded)" }}
          onClick={() => {
            playClick();
            speak(current.speech);
          }}
        >
          听一听
        </button>
        <button
          className="pill-button"
          style={{ background: "linear-gradient(180deg, #ff96bf, #ff5795)" }}
          onClick={() => {
            playClick();
            playSound("pop");
            setIndex((value) => (value + 1) % numbers.length);
            setPopKey((value) => value + 1);
          }}
        >
          下一张
        </button>
      </div>
    </section>
  );
}
