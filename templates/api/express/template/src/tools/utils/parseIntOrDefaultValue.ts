/** returns the defaultValue provided, if parseInt(value) return NaN */
export function parseIntOrDefaultValue (
  value: string | undefined,
  defaultValue: number
): number {
  const valueInteger = parseInt(value as string, 10)
  if (value != null && !isNaN(valueInteger)) {
    return valueInteger
  }
  return defaultValue
}
