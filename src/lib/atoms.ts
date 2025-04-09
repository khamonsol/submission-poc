import { atom } from 'jotai';
import { add, isAfter, startOfToday } from 'date-fns';

export interface CsvData {
  [key: string]: string;
}

export const csvDataAtom = atom<CsvData[]>([]);
export const columnsAtom = atom<string[]>([]);

// Date atoms
const defaultDate: Date = add(new Date(), { days: -1 });
export const maxDate: Date = add(new Date(), { days: 7 });
export const tradeDateAtom = atom<Date | null>(null);

// ISO atoms
export const isoOptionsAtom = atom(["CAISO", "ERCOT", "MISO", "PJMISO", "NEISO", "NYISO"]);
export const selectedIsoAtom = atom('');

// Account atoms
export const accountOptionsAtom = atom(['Account1', 'Account2', 'Account3']); // Placeholder for demo
export const selectedAccountAtom = atom('');

// Product atoms
export const productOptionsAtom = atom((get) => {
  let opts = ['Virtual Offer', 'Virtual Bid'];
  if (get(selectedIsoAtom) === 'ERCOT' || get(selectedIsoAtom) === 'PJMISO') {
    opts = ['UTC/Spread', ...opts];
  }
  return opts;
});
export const selectedProductAtom = atom('');

// Submit validation atom
export const canSubmitAtom = atom((get) => {
  const date = get(tradeDateAtom);
  const iso = get(selectedIsoAtom);
  const account = get(selectedAccountAtom);
  const product = get(selectedProductAtom);
  const csvData = get(csvDataAtom);

  return (
    date !== null &&
    isAfter(date, startOfToday()) &&
    iso !== '' &&
    account !== '' &&
    product !== '' &&
    csvData.length > 0
  );
});