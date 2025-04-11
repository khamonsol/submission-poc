import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select'
import { useAtom } from 'jotai/index'
import { isoOptionsAtom, selectedIsoAtom } from '@/shared/atoms/iso'
import { AlertCircleIcon, BatteryWarningIcon } from 'lucide-react'

export function IsoSelector() {
  const [isoOptions] = useAtom(isoOptionsAtom);
  const [selectedIso, setSelectedIso] = useAtom(selectedIsoAtom);

  const iconSize = (selectedIso?.length > 1) ? 0: 12

  return (
    <>
    <label className="text-sm font-medium" >ISO</label>
    <Select required={true} value={selectedIso} onValueChange={setSelectedIso}>
      <SelectTrigger className="w-[180px]">
        <AlertCircleIcon color="red" size={iconSize}  />
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
  </>
  )
}