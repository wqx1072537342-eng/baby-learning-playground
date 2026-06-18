export type NumberItem = {
  value: number;
  text: string;
  speech: string;
};

export type CountableItem = {
  id: string;
  name: string;
  image: string;
  measureWord: string;
};

export type ColorItem = {
  id: string;
  name: string;
  hex: string;
  image: string;
  speech: string;
};

export type CountQuestion = {
  id: string;
  itemId: string;
  count: number;
};

export type ColorQuestion = {
  id: string;
  colorId: string;
};

export type PlayQuestion = {
  id: string;
  item: CountableItem;
  count: number;
  prompt: string;
  successSpeech: string;
  options: number[];
};

export type ColorPlayQuestion = {
  id: string;
  answer: ColorItem;
  prompt: string;
  successSpeech: string;
  options: ColorItem[];
};
