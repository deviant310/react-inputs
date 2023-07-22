/**
 * Check value length
 * @param value
 */
export function numberHasAppropriateLength (value: number) {
  return value.toString().replace('.', '').length <= 15;
}

/**
 * Transform raw value to integer
 * @param entry
 */
export function parseInteger (entry: string | number) {
  if (entry === undefined)
    return 0;

  const [, digit, symbol] = [...entry.toString().matchAll(/(\d*)([-|+])$/g)][0] || [entry, entry, ''];

  return Number(digit ? `${symbol}${digit}` : '');
}
