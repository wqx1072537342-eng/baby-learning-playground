"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { playClick } from "@/lib/audio";

type BigButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  ariaLabel?: string;
};

export function BigButton({
  href,
  children,
  className,
  style,
  onClick,
  ariaLabel
}: BigButtonProps) {
  const handleClick = () => {
    playClick();
    onClick?.();
  };

  if (href) {
    return (
      <Link
        aria-label={ariaLabel}
        className={className}
        href={href}
        style={style}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={ariaLabel} className={className} style={style} onClick={handleClick}>
      {children}
    </button>
  );
}
