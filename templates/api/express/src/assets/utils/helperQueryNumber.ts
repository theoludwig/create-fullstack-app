function helperQueryNumber (value: string, defaultValue: number): number {
  if (value != null && !isNaN(Number(value))) {
    return parseInt(value, 10)
  }
  return defaultValue
}

export default helperQueryNumber
