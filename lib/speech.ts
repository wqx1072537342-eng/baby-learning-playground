export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.72;
    utterance.pitch = 1.18;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // SpeechSynthesis support varies by browser; the UI remains usable without it.
  }
}
