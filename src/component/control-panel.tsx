import { format, startOfToday } from 'date-fns';
import { Calendar } from '@/component/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { Button } from '@/component/ui/button';
import { CalendarIcon, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import {
  tradeDateAtom,
  maxDate,
  isoOptionsAtom,
  selectedIsoAtom,
  accountOptionsAtom,
  selectedAccountAtom,
  productOptionsAtom,
  selectedProductAtom,
  canSubmitAtom,
} from '@/lib/atoms';

export function ControlPanel() {
  const [date, setDate] = useAtom(tradeDateAtom);
  const [isoOptions] = useAtom(isoOptionsAtom);
  const [selectedIso, setSelectedIso] = useAtom(selectedIsoAtom);
  const [accountOptions] = useAtom(accountOptionsAtom);
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [productOptions] = useAtom(productOptionsAtom);
  const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom);
  const [canSubmit] = useAtom(canSubmitAtom);

  const handleSubmit = () => {
    console.log('Submitting trades:', {
      date,
      selectedIso,
      selectedAccount,
      selectedProduct,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Trade Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date || undefined}
              onSelect={(newDate) => newDate && setDate(newDate)}
              disabled={(date) => date <= startOfToday() || date > maxDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">ISO</label>
        <Select value={selectedIso} onValueChange={setSelectedIso}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select ISO" />
          </SelectTrigger>
          <SelectContent>
            {isoOptions.map((iso) => (
              <SelectItem key={iso} value={iso}>
                {iso}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Account</label>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Account" />
          </SelectTrigger>
          <SelectContent>
            {accountOptions.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Product</label>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {productOptions.map((product) => (
              <SelectItem key={product} value={product}>
                {product}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">&nbsp;</label>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="bg-success hover:bg-success/90 text-success-foreground"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Trades
        </Button>
      </div>
    </div>
  );
}