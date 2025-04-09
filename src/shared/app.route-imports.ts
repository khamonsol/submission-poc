/**
 * Imports are the name of the report as the key
 * and path to report page
 */

const imports = {
  'Submission': import(
    '../page/Submission/Submission'
    ),
}

export const routeImport = (key: string): Promise<never> => {
  if (!(key in imports)) {
    throw new Error('Item has not been registered in the imports')
  }
  // @ts-expect-error because the linter told me to
  return imports[key]
}