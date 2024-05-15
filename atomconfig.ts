import { atom } from "jotai";

export interface StringKeyObject {
  [key: string]: number;
}

export const tableNumberAtom = atom<string>("");

export const orderAtom = atom<StringKeyObject>({});
