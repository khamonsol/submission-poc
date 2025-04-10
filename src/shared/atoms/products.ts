import { atom } from 'jotai/index'
import { selectedIsoAtom } from '@/shared/atoms/iso'


export const productOptionsAtom = atom((get) => {
  let opts = ['Virtual Offer', 'Virtual Bid'];
  if (get(selectedIsoAtom) === 'ERCOT' || get(selectedIsoAtom) === 'PJMISO') {
    opts = ['UTC/Spread', ...opts];
  }
  return opts;
});
export const selectedProductAtom = atom('');