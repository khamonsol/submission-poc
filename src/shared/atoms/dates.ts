import { add, startOfTomorrow } from 'date-fns'
import { atom } from 'jotai'

export const maxDate: Date = add(new Date(), { days: 7 });
export const tradeDateAtom = atom<Date | null>(startOfTomorrow());