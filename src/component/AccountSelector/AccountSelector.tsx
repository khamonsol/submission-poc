import { useAtom } from 'jotai/index'
import { accountOptionsAtom, selectedAccountAtom, isAccountsLoadingAtom } from '@/shared/atoms/account'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select'
import { useAtomValue } from 'jotai'
import { AlertCircleIcon, Loader2 } from 'lucide-react'

export function AccountSelector() {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const accountOptions = useAtomValue(accountOptionsAtom);
  const isLoading = useAtomValue(isAccountsLoadingAtom);
  const iconSize = (selectedAccount?.length > 1) ? 0: 12;
  
  // Determine if we have no accounts for the selected ISO
  const noAccountsForIso = !isLoading && accountOptions.length === 0;

  return (
    <>
      <label className="text-sm font-medium">Account</label>
      <Select 
        value={selectedAccount} 
        onValueChange={setSelectedAccount} 
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            selectedAccount === '' && <AlertCircleIcon color="red" size={iconSize} />
          )}
          <SelectValue 
            placeholder={
              isLoading 
                ? "Loading accounts..." 
                : noAccountsForIso 
                  ? "No accounts available" 
                  : "Select Account"
            } 
          />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading accounts...
            </SelectItem>
          ) : accountOptions.length > 0 ? (
            accountOptions.map((ui) => (
              <SelectItem key={ui.asset_owner} value={ui.asset_owner}>
                {`${ui.trader}(${ui.asset_owner})`}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-accounts" disabled>
              No accounts available for this ISO
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </>
  )
}