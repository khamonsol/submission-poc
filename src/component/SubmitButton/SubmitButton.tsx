import { Button } from '@/component/ui/button';
import { Send } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { canSubmitAtom, validateCSVHeaders } from '@/shared/atoms/validation';
import { apiFilePayloadAtom } from '@/shared/atoms/fileData';
import { selectedIsoAtom } from '@/shared/atoms/iso';
import { selectedProductAtom } from '@/shared/atoms/products';
import { selectedAccountAtom } from '@/shared/atoms/account';
import { tradeDateAtom } from '@/shared/atoms/dates';

export function SubmitButton() {
  const canSubmit = useAtomValue(canSubmitAtom);
  const validationResult = useAtomValue(validateCSVHeaders);
  const apiPayload = useAtomValue(apiFilePayloadAtom);
  const selectedIso = useAtomValue(selectedIsoAtom);
  const selectedProduct = useAtomValue(selectedProductAtom);
  const selectedAccount = useAtomValue(selectedAccountAtom);
  const tradeDate = useAtomValue(tradeDateAtom);

  // Only allow submission if validation passes (empty string means validation passed)
  const isValid = canSubmit && validationResult === '';

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
  );
} 