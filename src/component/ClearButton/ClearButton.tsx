import { Button } from '@/component/ui/button';
import { RefreshCw } from 'lucide-react';
import { useSetAtom, useAtomValue } from 'jotai';
import { csvDataAtom, columnsAtom } from '@/shared/atoms/fileData';
import { selectedIsoAtom } from '@/shared/atoms/iso';
import { selectedProductAtom } from '@/shared/atoms/products';
import { selectedAccountAtom } from '@/shared/atoms/account';
import { tradeDateAtom } from '@/shared/atoms/dates';
import { hasModificationsAtom, getDefaultTradeDate } from '@/shared/atoms/reset-state';

export function ResetButton() {
  // Get setters for resetting state
  const setSelectedIso = useSetAtom(selectedIsoAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const setSelectedAccount = useSetAtom(selectedAccountAtom);
  const setTradeDate = useSetAtom(tradeDateAtom);
  const setCsvData = useSetAtom(csvDataAtom);
  const setColumns = useSetAtom(columnsAtom);
  
  // Use the composition atom to determine if reset is needed
  const hasModifications = useAtomValue(hasModificationsAtom);

  const handleReset = () => {
    // Reset all form elements to defaults
    setSelectedIso('');
    setSelectedProduct('');
    setSelectedAccount('');
    // Set trade date to tomorrow (default)
    setTradeDate(getDefaultTradeDate());
    setCsvData([]);
    setColumns([]);
  };

  return (
    <>
      <label className="text-sm font-medium">&nbsp;</label>
      <Button
        onClick={handleReset}
        variant="outline"
        className="border-gray-300 hover:bg-gray-100"
        disabled={!hasModifications}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Reset
      </Button>
    </>
  );
} 