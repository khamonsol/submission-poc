import { useAtom } from 'jotai/index'
import { accountOptionsAtom, selectedAccountAtom } from '@/shared/atoms/account'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select'
import { useAtomValue } from 'jotai'
import { AlertCircleIcon } from 'lucide-react'


export function AccountSelector() {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const accountOptions = useAtomValue(accountOptionsAtom)
  const iconSize = (selectedAccount?.length > 1) ? 0: 12

  return (
    <>
      <label className="text-sm font-medium">Account</label>
      <Select value={selectedAccount} onValueChange={setSelectedAccount}>
        <SelectTrigger className="w-[180px]">
          <AlertCircleIcon color="red" size={iconSize}  />
          <SelectValue placeholder="Select Account" />
        </SelectTrigger>
        <SelectContent>
          {accountOptions.map((ui) => (
            <SelectItem key={ui.asset_owner} value={ui.asset_owner}>
              {`${ui.trader}(${ui.asset_owner})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}