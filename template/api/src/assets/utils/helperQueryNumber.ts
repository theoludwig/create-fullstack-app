function helperQueryNumber(value: any, defaultValue: number) {
    if (value && !isNaN(Number(value))) return parseInt(value as string, 10);
    return defaultValue;
}

export default helperQueryNumber;
