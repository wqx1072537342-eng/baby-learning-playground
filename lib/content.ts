import animals from "@/data/animals.json";
import colors from "@/data/colors.json";
import fruits from "@/data/fruits.json";
import numbers from "@/data/numbers.json";
import questions from "@/data/questions.json";
import type {
  ColorItem,
  ColorPlayQuestion,
  ColorQuestion,
  CountQuestion,
  CountableItem,
  NumberItem,
  PlayQuestion
} from "./types";

const countTexts: Record<number, string> = {
  0: "零",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五"
};

function getById<T extends { id: string }>(items: T[], id: string) {
  const item = items.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`内容库缺少 id: ${id}`);
  }
  return item;
}

function makeOptions(answer: number) {
  const base = new Set<number>([answer]);
  const candidates = [answer - 1, answer + 1, answer - 2, answer + 2, 1, 2, 3, 4, 5];

  for (const candidate of candidates) {
    if (candidate >= 1 && candidate <= 5) {
      base.add(candidate);
    }
    if (base.size === 4) break;
  }

  return [...base].sort((a, b) => a - b);
}

function makeCountQuestions(
  sourceQuestions: CountQuestion[],
  sourceItems: CountableItem[]
): PlayQuestion[] {
  return sourceQuestions.map((question) => {
    const item = getById(sourceItems, question.itemId);
    const countText = countTexts[question.count] ?? String(question.count);

    return {
      id: question.id,
      item,
      count: question.count,
      prompt: `有几${item.measureWord}${item.name}？`,
      successSpeech: `太棒啦，${countText}${item.measureWord}${item.name}！`,
      options: makeOptions(question.count)
    };
  });
}

export function getNumbersByRange(range: string): NumberItem[] {
  const list = numbers as NumberItem[];

  if (range === "0-10") {
    return list.filter((item) => item.value >= 0 && item.value <= 10);
  }
  if (range === "11-50") {
    return list.filter((item) => item.value >= 11 && item.value <= 50);
  }
  if (range === "50-100") {
    return list.filter((item) => item.value >= 50 && item.value <= 100);
  }

  return [];
}

export function getAnimalQuestions() {
  return makeCountQuestions(
    (questions as { animals: CountQuestion[] }).animals,
    animals as CountableItem[]
  );
}

export function getFruitQuestions() {
  return makeCountQuestions(
    (questions as { fruits: CountQuestion[] }).fruits,
    fruits as CountableItem[]
  );
}

export function getColorQuestions(): ColorPlayQuestion[] {
  const colorItems = colors as ColorItem[];

  return (questions as { colors: ColorQuestion[] }).colors.map((question, index) => {
    const answer = getById(colorItems, question.colorId);
    const rotated = [...colorItems.slice(index), ...colorItems.slice(0, index)];
    const options = [answer, ...rotated.filter((item) => item.id !== answer.id)].slice(0, 4);

    return {
      id: question.id,
      answer,
      prompt: `哪个是${answer.name}？`,
      successSpeech: `答对啦，这是${answer.name}！${answer.speech}`,
      options
    };
  });
}

export const numberRanges = [
  {
    href: "/numbers/0-10",
    title: "数字启蒙",
    range: "0-10",
    image: "/assets/characters/chick.png",
    color: "linear-gradient(180deg, #a8ec61, #6bd02a)"
  },
  {
    href: "/numbers/11-50",
    title: "数字进阶",
    range: "11-50",
    image: "/assets/characters/rabbit.png",
    color: "linear-gradient(180deg, #c89bff, #8b68ff)"
  },
  {
    href: "/numbers/50-100",
    title: "数字大师",
    range: "50-100",
    image: "/assets/characters/lion.png",
    color: "linear-gradient(180deg, #ffbf56, #ff8b22)"
  }
];

export function getAllNumberRanges(): string[] {
  return numberRanges.map((item) => item.range);
}
