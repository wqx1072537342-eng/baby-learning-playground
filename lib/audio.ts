const soundMap = {
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  wrong: "/sounds/wrong.mp3",
  pop: "/sounds/pop.mp3",
  reward: "/sounds/reward.mp3"
} as const;

export type SoundName = keyof typeof soundMap;

export function playSound(name: SoundName) {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(soundMap[name]);
    audio.volume = 0.65;
    const result = audio.play();
    if (result) {
      result.catch(() => undefined);
    }
  } catch {
    // Missing audio files or browser autoplay limits should not break the game.
  }
}

export function playClick() {
  playSound("click");
}
