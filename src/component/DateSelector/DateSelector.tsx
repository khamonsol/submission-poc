import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover'
import { Button } from '@/component/ui/button'
import { cn } from '@/shared/util/utils'
import { CalendarIcon } from 'lucide-react'
import { format, startOfToday } from 'date-fns'
import { Calendar } from '@/component/ui/calendar'
import { maxDate, tradeDateAtom } from '@/shared/atoms/dates'
import { useAtom } from 'jotai/index'


export function DateSelector() {
  const [date, setDate] = useAtom(tradeDateAtom);
  return (
    <>
      <label className="text-sm font-medium" >Trade Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-[150px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
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
    </>)
}