
import { Button } from '@/component/ui/button';
import {  Send } from 'lucide-react';
import {  useAtomValue } from 'jotai'
import { canSubmitAtom } from '@/shared/atoms/validation'
import { AccountSelector } from '@/component/AccountSelector/AccountSelector'
import { DateSelector } from '@/component/DateSelector/DateSelector'
import { IsoSelector } from '@/component/IsoSelector/IsoSelector'
import { ProductSelector } from '@/component/ProductSelector/ProductSelector'


function SubmitButton() {
  const canSubmit = useAtomValue(canSubmitAtom)

  console.log('canSubmit', canSubmit)

  const handleSubmit = () => {
    console.log('Submitting trades:')
  };

  return (
    <>
      <label className="text-sm font-medium">&nbsp;</label>
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="bg-success hover:bg-success/90 text-success-foreground"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Trades
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
    </div>
  );
}