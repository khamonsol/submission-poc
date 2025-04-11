import { atom } from 'jotai';
import { selectedIsoAtom } from '@/shared/atoms/iso';
import { selectedProductAtom } from '@/shared/atoms/products';
import { selectedAccountAtom } from '@/shared/atoms/account';
import { tradeDateAtom } from '@/shared/atoms/dates';
import { csvDataAtom } from '@/shared/atoms/fileData';
import { addDays, isSameDay } from 'date-fns';

// The tomorrow date that we use as default
export const getDefaultTradeDate = () => addDays(new Date(), 1);

// Atom that tracks if any form element has been modified from its default state
export const hasModificationsAtom = atom((get) => {
  const selectedIso = get(selectedIsoAtom);
  const selectedProduct = get(selectedProductAtom);
  const selectedAccount = get(selectedAccountAtom);
  const tradeDate = get(tradeDateAtom);
  const csvData = get(csvDataAtom);
  
  // Default values for comparison
  const defaultIso = '';
  const defaultProduct = '';
  const defaultAccount = ''; // Account might have placeholder values, but empty is the true default
  const defaultTradeDate = getDefaultTradeDate();
  
  // Check ISO: modified if not empty and not undefined
  const isoModified = selectedIso !== defaultIso && selectedIso !== undefined;
  
  // Check Product: modified if not empty and not undefined
  const productModified = selectedProduct !== defaultProduct && selectedProduct !== undefined;
  
  // Check Account: modified if not empty, not undefined, and not a system message
  const accountModified = selectedAccount !== defaultAccount && 
                          selectedAccount !== undefined && 
                          selectedAccount !== 'No account available' &&
                          selectedAccount !== 'Loading...' &&
                          selectedAccount !== 'No accounts available';
  
  // Check Trade Date: use date comparison to handle date objects properly
  const dateModified = tradeDate !== null && 
                      !isSameDay(tradeDate, defaultTradeDate);
  
  // Check CSV Data: modified if array exists and has items
  const csvModified = csvData && csvData.length > 0;
  
  // Return true if ANY element has been modified from default
  return isoModified || productModified || accountModified || dateModified || csvModified;
}); 