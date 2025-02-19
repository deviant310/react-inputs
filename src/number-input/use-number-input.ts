import { ChangeEvent, Dispatch, useCallback, useMemo } from "react";

export const useNumberInput = (dispatch: Dispatch<number> | undefined) => {
  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseRawValue(target.value);

      if (!isNaN(value) && numberHasAppropriateLength(value)) dispatch?.(value);
    },
    [dispatch],
  );

  return useMemo(() => ({ onChange }), [onChange]);
};

/**
 * Check value length
 * @param value
 */
function numberHasAppropriateLength(value: number) {
  return value.toString().replace(".", "").length <= 15;
}

/**
 * Transform raw value to integer
 * @param entry
 */
function parseRawValue(entry: string | number | null | undefined) {
  if (!entry) return 0;

  const [, digit, symbol] = [
    ...entry.toString().matchAll(/(\d*)([-|+])$/g),
  ][0] || [entry, entry, ""];

  return Number(digit ? `${symbol}${digit}` : "");
}
