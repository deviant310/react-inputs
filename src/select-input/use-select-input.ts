import { useMemo } from "react";

/**
 * @category Hooks
 * @param props
 */
export const useSelectInput = <OptionData>(
  props: UseSelectInputProps<OptionData>,
) => {
  const {
    displayStringForOption,
    getOptionKey,
    options,
    selectedOption,
    onOptionSelect,
  } = props;

  const stringForSelectedOption = useMemo(
    () =>
      selectedOption
        ? (displayStringForOption?.(selectedOption) ?? `${selectedOption}`)
        : "",
    [displayStringForOption, selectedOption],
  );

  const optionsProps = useMemo<Array<SelectInputOptionProps<OptionData>>>(
    () =>
      options.map(option => ({
        option,
        key: getOptionKey?.(option) ?? `${option}`,
        onClick: () => onOptionSelect?.(option),
      })),
    [getOptionKey, onOptionSelect, options],
  );

  return useMemo(
    () => ({ stringForSelectedOption, optionsProps }),
    [stringForSelectedOption, optionsProps],
  );
};

/**
 * Select input hook props
 */
export interface UseSelectInputProps<OptionData> {
  /**
   * A function that should return the string to display in the input when the option is selected.
   *
   * @param option
   */
  displayStringForOption?(option: OptionData): string;

  /**
   * A function that should return option key.
   *
   * @param option - Data of selected option
   */
  getOptionKey?(option: OptionData): string | number;

  /**
   * Array of options
   */
  options: OptionData[];

  selectedOption: OptionData | null;

  onOptionSelect?(option: OptionData | null): void;
}

/**
 * Option props for rendering option element
 */
export interface SelectInputOptionProps<OptionData> {
  option: OptionData;
  key: string | number;
  onClick(): void;
}
