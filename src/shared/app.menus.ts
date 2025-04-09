import { Menu, MenuType } from '@beyond/storage'




export const legacyRoleTraderPlus = (newRole: string): string[] => {
  return [ 'Beyond.Dev', newRole]
}

export const keyFromPath = (path: string) => {
  const parts = path?.split('/')
  return parts[parts.length - 1]
}

export const SUBMISSION = {
  name: 'Submission',
  route: 'submission',
  type: MenuType.UTILITY,
  roles: legacyRoleTraderPlus('Beyond.FEATURE_PNL_Dashboard'),
  parentName: undefined,
  iconClass: 'pi-star',
}



const reports: Menu[] = [
  SUBMISSION
]
export const menus: Menu[] = reports
