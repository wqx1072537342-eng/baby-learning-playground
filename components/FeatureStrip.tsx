import Image from "next/image";

const features = [
  { image: "/assets/icons/music.png", label: "标准发音" },
  { image: "/assets/icons/star.png", label: "趣味游戏" },
  { image: "/assets/icons/cloud.png", label: "安全无广告" },
  { image: "/assets/icons/rainbow.png", label: "科学分阶段" }
];

export function FeatureStrip() {
  return (
    <div className="feature-strip">
      {features.map((feature) => (
        <div className="feature-item" key={feature.label}>
          <span>
            <Image src={feature.image} alt="" width={28} height={28} />
          </span>
          {feature.label}
        </div>
      ))}
    </div>
  );
}
