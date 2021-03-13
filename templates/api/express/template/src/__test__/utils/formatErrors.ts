/** formatErrors for testing purpose (no types safety) */
export const formatErrors = (errors: any): string[] => {
  try {
    return errors.map((e: any) => e.message)
  } catch {
    return []
  }
}
