import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  SelectInputHook,
  SelectInputOptionItem,
  SelectInputOptionProps,
} from '../types';

/**
 * @category Hooks
 * @param props
 */
export const useSelectInput: SelectInputHook = props => {
  type Option = typeof optionsData[number];

  const {
    displayStringForOption,
    dropdownIsVisibleByDefault = false,
    getOptionKey,
    onReset,
    onTextboxValueChange,
    optionsBuilder,
    setValue: setSelectedOption,
    value: selectedOption,
  } = props;

  const stringForSelectedOption = selectedOption
    ?  displayStringForOption(selectedOption)
    : '';

  const [dropdownIsVisible, setDropdownVisibility] = useState(dropdownIsVisibleByDefault);
  const [textboxValue, setTextboxValue] = useState(stringForSelectedOption);
  const trimmedInputValue = textboxValue.trim();

  const onOptionSelect = useCallback(
    (option: Option) => {
      setDropdownVisibility(false);

      setTextboxValue(
        displayStringForOption(option),
      );

      setSelectedOption(option);
    },
    [displayStringForOption, setSelectedOption],
  );

  const optionsData = useMemo(
    () => optionsBuilder(trimmedInputValue),
    [optionsBuilder, trimmedInputValue],
  );

  const options = useMemo(
    () => {
      return optionsData
        .map(optionData => <SelectInputOptionItem<Option>>({
          data: optionData,
          key: getOptionKey(optionData),
          onClick: () => onOptionSelect(optionData),
        }));
    },
    [getOptionKey, onOptionSelect, optionsData],
  );

  const inputHasOptions = useMemo(
    () => options.length > 0,
    [options],
  );

  const showDropdown = useMemo(
    () => inputHasOptions && dropdownIsVisible,
    [dropdownIsVisible, inputHasOptions],
  );

  const reset = useCallback(
    () => {
      setDropdownVisibility(false);

      setTextboxValue(stringForSelectedOption);

      onReset?.();
    },
    [onReset, stringForSelectedOption],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      reset();
    },
    [reset],
  );

  const handleTextboxChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const inputHasValue = Boolean(value.length);

      setDropdownVisibility(inputHasValue);

      setTextboxValue(value);

      if (!inputHasValue)
        setSelectedOption(null);

      onTextboxValueChange?.(value);
    },
    [onTextboxValueChange, setSelectedOption],
  );

  return useMemo(
    () => ({
      handleBlur,
      handleTextboxChange,
      options,
      showDropdown,
      textboxValue,
    }),
    [
      handleBlur,
      handleTextboxChange,
      options,
      showDropdown,
      textboxValue,
    ],
  );
};
