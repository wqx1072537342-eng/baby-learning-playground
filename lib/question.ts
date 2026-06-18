export function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function nextIndex(current: number, total: number) {
  if (total <= 0) return 0;
  return (current + 1) % total;
}
