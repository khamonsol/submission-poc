import { AccountSelector } from '@/component/AccountSelector/AccountSelector'
import { DateSelector } from '@/component/DateSelector/DateSelector'
import { IsoSelector } from '@/component/IsoSelector/IsoSelector'
import { ProductSelector } from '@/component/ProductSelector/ProductSelector'
import { ResetButton } from '@/component/ResetButton/ResetButton'
import { SubmitButton } from '@/component/SubmitButton/SubmitButton'

//This really should be a form, but I don't have time right now
export function ControlPanel() {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end justify-between">
      <div className="flex flex-wrap gap-4 items-end">
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
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col gap-2">
          <SubmitButton />
        </div>
        <div className="flex flex-col gap-2">
          <ResetButton />
        </div>
      </div>
    </div>
  );
}