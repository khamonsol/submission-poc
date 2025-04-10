import { useAtom } from 'jotai/index'
import { accountOptionsAtom, selectedAccountAtom } from '@/shared/atoms/account'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select'
import { useAtomValue } from 'jotai'


export function AccountSelector() {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const accountOptions = useAtomValue(accountOptionsAtom)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Account</label>
      <Select value={selectedAccount} onValueChange={setSelectedAccount}>
        <SelectTrigger className="w-[180px]">
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
    </div>
  )
}