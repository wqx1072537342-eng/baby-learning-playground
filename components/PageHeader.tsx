"use client";

import { useRouter } from "next/navigation";
import { playClick } from "@/lib/audio";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="top-bar">
        <button
          aria-label="返回"
          className="back-button"
          onClick={() => {
            playClick();
            router.back();
          }}
        >
          ←
        </button>
        <h1 className="screen-title">{title}</h1>
        <div aria-hidden="true" style={{ width: 52 }} />
      </div>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </>
  );
}
