import { Button } from '@/component/ui/button';
import { Send, RefreshCw } from 'lucide-react';
import { useAtomValue, useSetAtom } from 'jotai'
import { canSubmitAtom, validateCSVHeaders } from '@/shared/atoms/validation'
import { AccountSelector } from '@/component/AccountSelector/AccountSelector'
import { DateSelector } from '@/component/DateSelector/DateSelector'
import { IsoSelector } from '@/component/IsoSelector/IsoSelector'
import { ProductSelector } from '@/component/ProductSelector/ProductSelector'
import { apiFilePayloadAtom, csvDataAtom, columnsAtom } from '@/shared/atoms/fileData'
import { selectedIsoAtom } from '@/shared/atoms/iso'
import { selectedProductAtom } from '@/shared/atoms/products'
import { selectedAccountAtom } from '@/shared/atoms/account'
import { tradeDateAtom } from '@/shared/atoms/dates'


function SubmitButton() {
  const canSubmit = useAtomValue(canSubmitAtom)
  const validationResult = useAtomValue(validateCSVHeaders)
  const apiPayload = useAtomValue(apiFilePayloadAtom)
  const selectedIso = useAtomValue(selectedIsoAtom)
  const selectedProduct = useAtomValue(selectedProductAtom)
  const selectedAccount = useAtomValue(selectedAccountAtom)
  const tradeDate = useAtomValue(tradeDateAtom)

  // Only allow submission if validation passes (empty string means validation passed)
  const isValid = canSubmit && validationResult === ''

  const handleSubmit = () => {
    if (!isValid) return;

    console.log('Submitting trades:', {
      iso: selectedIso,
      product: selectedProduct,
      account: selectedAccount,
      tradeDate: tradeDate,
      data: apiPayload
    });

    // Here you would make the API call to submit the data
    // Example:
    // submitTrades(selectedIso, selectedProduct, selectedAccount, tradeDate, apiPayload)
    //   .then(response => console.log('Submission successful', response))
    //   .catch(error => console.error('Submission failed', error));
  };

  return (
    <>
      <label className="text-sm font-medium">&nbsp;</label>
      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="bg-success hover:bg-success/90 text-success-foreground"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Trades
      </Button>
    </>
  )
}

function ClearButton() {
  const setSelectedIso = useSetAtom(selectedIsoAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const setSelectedAccount = useSetAtom(selectedAccountAtom);
  const setTradeDate = useSetAtom(tradeDateAtom);
  const setCsvData = useSetAtom(csvDataAtom);
  const setColumns = useSetAtom(columnsAtom);

  const handleClear = () => {
    // Reset all form elements
    setSelectedIso('');
    setSelectedProduct('');
    setSelectedAccount('');
    setTradeDate(null);
    setCsvData([]);
    setColumns([]);
  };

  return (
    <>
      <label className="text-sm font-medium">&nbsp;</label>
      <Button
        onClick={handleClear}
        variant="outline"
        className="border-gray-300 hover:bg-gray-100"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Clear All
      </Button>
    </>
  )
}

//This really should be a form, but I don't have time right now
export function ControlPanel() {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end">
      <div className="flex flex-col gap-2">
        <DateSelector />
      </div>
      <div className="flex flex-col gap-2">
        <IsoSelector />
      </div>
      <div className="flex flex-col gap-2">
        <AccountSelector />
      </div>
      <div className="flex flex-col gap-2">
        <ProductSelector />
      </div>
      <div className="flex flex-col gap-2">
        <SubmitButton />
      </div>
      <div className="flex flex-col gap-2">
        <ClearButton />
      </div>
    </div>
  );
}