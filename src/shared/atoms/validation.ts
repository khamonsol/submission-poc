import { atom } from 'jotai/index'
import { selectedIsoAtom } from '@/shared/atoms/iso'
import { selectedAccountAtom } from '@/shared/atoms/account'
import { selectedProductAtom } from '@/shared/atoms/products'
import { isAfter, startOfToday } from 'date-fns'
import { tradeDateAtom } from '@/shared/atoms/dates'
import { csvDataAtom } from '@/shared/atoms/fileData'

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