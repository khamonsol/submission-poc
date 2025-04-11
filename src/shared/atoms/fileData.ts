import { atom } from 'jotai'
import { selectedIsoAtom } from '@/shared/atoms/iso'
import { getSerializer } from '@/shared/util/csvSerializers'

export interface CsvData {
  [key: string]: string;
}

export const csvDataAtom = atom<CsvData[]>([]);
export const columnsAtom = atom<string[]>([]);

export const apiFilePayloadAtom = atom((get) => {
  const selectedIso = get(selectedIsoAtom);
  const selectedProduct = get(selectedIsoAtom);
  const csvData = get(csvDataAtom);
  const serializer = getSerializer(selectedIso, selectedProduct);
  return serializer(csvData);
})