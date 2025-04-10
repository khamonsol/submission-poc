import { atom } from 'jotai'

export interface CsvData {
  [key: string]: string;
}

export const csvDataAtom = atom<CsvData[]>([]);
export const columnsAtom = atom<string[]>([]);