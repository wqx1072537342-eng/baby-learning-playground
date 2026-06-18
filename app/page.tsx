import Image from "next/image";
import { BigButton } from "@/components/BigButton";
import { FeatureStrip } from "@/components/FeatureStrip";

const entries = [
  {
    href: "/numbers",
    image: "/assets/icons/star.png",
    label: "学数字",
    background: "linear-gradient(180deg, #fff7ce, #fff)"
  },
  {
    href: "/animals",
    image: "/assets/characters/dog.png",
    label: "数动物",
    background: "linear-gradient(180deg, #fff0e8, #fff)"
  },
  {
    href: "/fruits",
    image: "/assets/icons/apple.png",
    label: "数水果",
    background: "linear-gradient(180deg, #ffeaf2, #fff)"
  },
  {
    href: "/colors",
    image: "/assets/icons/rainbow.png",
    label: "认识颜色",
    background: "linear-gradient(180deg, #eaf8ff, #fff)"
  }
];

export default function HomePage() {
  return (
    <main className="app-shell fade-in">
      <h1 className="hero-title">宝宝启蒙乐园</h1>
      <p className="hero-subtitle">快乐学习每一天</p>

      <div className="mascot-row" aria-hidden="true">
        <Image className="hero-boy" src="/assets/characters/boy.png" alt="" width={210} height={176} />
        <Image className="hero-friend" src="/assets/characters/panda.png" alt="" width={150} height={136} />
      </div>

      <BigButton className="primary-cta" href="/numbers">
        <span className="play-dot">▶</span>
        开始学习
      </BigButton>

      <nav className="home-grid" aria-label="学习入口">
        {entries.map((entry) => (
          <BigButton
            className="home-card"
            href={entry.href}
            key={entry.href}
            style={{ background: entry.background }}
          >
            <Image className="home-card-image" src={entry.image} alt="" width={48} height={48} />
            {entry.label}
          </BigButton>
        ))}
      </nav>

      <FeatureStrip />
    </main>
  );
}
