import { atomWithObservable, unwrap } from 'jotai/utils'
import { loggedInUser$ } from '@beyond/storage'
import { Atom, atom, WritableAtom } from 'jotai'
import { fetchAccounts, UploaderInfo } from '@/shared/api/accountApi'
import { atomWithQuery } from 'jotai-tanstack-query'
import { selectedIsoAtom } from '@/shared/atoms/iso'

const currentUserAtom = atomWithObservable(() => loggedInUser$, {
  initialValue: null,
})

export const userIdAtom = atom((get) => {
  const u = get(currentUserAtom)
  if (u != null) {
    return u.getShortId()
  } else {
    return 'Loading...'
  }
})

export const accountsQueryAtom = atomWithQuery((get) => (
  {
    queryKey: ['accounts', get(userIdAtom)],
    queryFn: fetchAccounts,
  }
))

//Async atom to fetch the accounts
const uploaderInfoAsyncAtom = atom(async () => {
  const res: UploaderInfo[] = await fetchAccounts()
  return res
})
//Unwrap the async atom so that we don't have to deal with the Promise downstream
const uploaderInfoAtom = unwrap(uploaderInfoAsyncAtom, () => [])

//Build appropriate options list based on iso selection
export const accountOptionsAtom: Atom<UploaderInfo[]> = atom((get) => {
  const selectedIso = get(selectedIsoAtom)
  const infos = get(uploaderInfoAtom)
  const opts: UploaderInfo[] = []
  const seenTraderIsoCombo = new Set<string>();
  (infos ?? [])
    .filter(i => !i.trader.includes('_')) // ignore STS
    .filter(i => !seenTraderIsoCombo.has(`${i.trader}${i.iso}`)) // ignore duplicate trader/iso combo
    .filter(i => !selectedIso || i.iso.toLowerCase() === selectedIso.toLowerCase()) // if an iso is selected, only keep matching entries
    .forEach(i => {
      opts.push(i);
      seenTraderIsoCombo.add(`${i.trader}${i.iso}`);
    });
  opts.sort((a, b) => a.trader.localeCompare(b.trader));
  return opts;
})

const baseSelectedAccountAtom = atom<string>('')

export const selectedAccountAtom =
  ((atom as unknown) as <Value, Update = Value>(
    read: (get: never) => Value,
    write: (get: never, set: never, update: Update) => void,
  ) => WritableAtom<Value, unknown[], never>)(
    (get) => {
      // @ts-expect-error the linter told me to
      const uis = get(accountOptionsAtom)
      if (uis.length === 0) {
        return '' // Return empty string instead of a message during loading
      }
      if (uis.length === 1) {
        return uis[0].asset_owner
      }
      // @ts-expect-error the linter told me to
      return get(baseSelectedAccountAtom)
    },
    (get, set, newVal: string) => {
      // @ts-expect-error the linter told me to
      set(baseSelectedAccountAtom, newVal)
    },
  )