import { atom } from 'jotai/index'
import { selectedIsoAtom } from '@/shared/atoms/iso'
import { selectedAccountAtom } from '@/shared/atoms/account'
import { selectedProductAtom } from '@/shared/atoms/products'
import { isAfter, endOfToday } from 'date-fns'
import { tradeDateAtom } from '@/shared/atoms/dates'
import { columnsAtom, csvDataAtom } from '@/shared/atoms/fileData'

export const canSubmitAtom = atom((get) => {
  const date = get(tradeDateAtom);
  const iso = get(selectedIsoAtom);
  const account = get(selectedAccountAtom);
  const product = get(selectedProductAtom);
  const csvData = get(csvDataAtom);

  const compareDate = (date)? date : new Date() //this accounts for unselected date, submission has to be the next day always.

  return (
    isAfter(compareDate, endOfToday()) &&
    iso !== '' &&
    account !== '' &&
    product !== '' &&
    csvData.length > 0
  );
});

/*
The following atoms will validate the csv headers are correct for the selected destination.

 */
function compareArraysIgnoreCaseAndOrder(
  expected: string[] | undefined,
  actual: string[] | undefined
): string {
  // Handle undefined arrays
  if (!expected || !actual) {
    return expected ? "CSV headers are missing" : "No expected headers found for this ISO/product combination";
  }
  
  const normalize = (arr: string[]): Set<string> =>
    new Set(arr.map((s) => s.toLowerCase()));

  const expectedSet = normalize(expected);
  const actualSet = normalize(actual);

  const missing = [...expectedSet].filter(item => !actualSet.has(item));
  const unexpected = [...actualSet].filter(item => !expectedSet.has(item));

  if (missing.length === 0 && unexpected.length === 0) {
    return "";
  }

  const parts: string[] = [];
  if (missing.length > 0) {
    parts.push(`Missing: ${missing.join(", ")}`);
  }
  if (unexpected.length > 0) {
    parts.push(`Unexpected: ${unexpected.join(", ")}`);
  }

  return parts.join(" | ");
}


const expected: Record<string, string[]> = {
  'ERCOTVIRTUAL': ['node', 'he', 'tranche', 'mw', 'price', 'is_block'],
  'ERCOTSPREAD': ['source', 'sink', 'he', 'tranche', 'mw', 'price', 'is_block'],
  'PJMISOVIRTUAL': ['node','node_id', 'he','tranche','mw','price'],
  'PJMISOSPREAD': ['source', 'source_id', 'sink', 'sink_id', 'he','tranche','mw','price'],
  'SPPISOVIRTUAL': ['node', 'he', 'tranche', 'mw', 'price', 'is_block'],
  'MISOVIRTUAL': ['node', 'he', 'tranche', 'mw', 'price'],
  'CAISOVIRTUAL': ['node', 'he', 'tranche', 'mw', 'price'],
  'NYISOVIRTUAL': ['node', 'he', 'tranche', 'mw', 'price'],
  'NEISOVIRTUAL': ['node', 'node_id', 'he', 'tranche', 'mw', 'price']
}

export const validateCSVHeaders = atom((get) => {
  const selectedIso = get(selectedIsoAtom);
  const selectedProduct = get(selectedProductAtom);
  const columns = get(columnsAtom);
  const csvData = get(csvDataAtom);

  if (!csvData || csvData.length === 0 || !columns || columns.length === 0) return '';
  
  // Only proceed if both ISO and product are selected
  if (!selectedIso || !selectedProduct) {
    return "Please select an ISO and product first";
  }
  
  const product = selectedProduct.includes('Virtual') ? 'VIRTUAL' : 'SPREAD';
  const key = `${selectedIso}${product}`;
  const expectedColumns = expected[key];
  
  // Check if we have expectations for this combination
  if (!expectedColumns) {
    console.warn(`No expected columns found for key: ${key}`);
    return `No validation rules found for ${selectedIso} ${selectedProduct}`;
  }
  
  return compareArraysIgnoreCaseAndOrder(expectedColumns, columns);
})





