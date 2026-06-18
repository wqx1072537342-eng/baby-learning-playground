"use client";

import { playClick } from "@/lib/audio";

const optionColors = [
  "linear-gradient(180deg, #91e247, #66c72a)",
  "linear-gradient(180deg, #ffd745, #ffb821)",
  "linear-gradient(180deg, #ff84b7, #ff5799)",
  "linear-gradient(180deg, #55caf8, #249fea)"
];

type OptionButtonProps = {
  label: string;
  index: number;
  disabled?: boolean;
  className?: string;
  onChoose: () => void;
};

export function OptionButton({ label, index, disabled, className, onChoose }: OptionButtonProps) {
  return (
    <button
      className={`option-button ${className ?? ""}`}
      disabled={disabled}
      style={{ background: optionColors[index % optionColors.length] }}
      onClick={() => {
        playClick();
        onChoose();
      }}
    >
      {label}
    </button>
  );
}
