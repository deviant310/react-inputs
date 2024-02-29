import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { SelectInput } from '../../../types/select-input';

export const useSelectInput: SelectInput.Hook = props => {
  type Option = typeof optionsData[number];

  const {
    displayStringForOption,
    dropdownIsVisibleByDefault = false,
    getOptionKey,
    onBlur,
    optionsBuilder,
    setValue,
    value,
  } = props;

  const [dropdownIsVisible, setDropdownVisibility] = useState(dropdownIsVisibleByDefault);
  const [inputValue, setInputValue] = useState('');

  const onOptionSelect = useCallback(
    (option: Option) => {
      setDropdownVisibility(false);

      setInputValue(
        displayStringForOption(option),
      );

      setValue(option);
    },
    [displayStringForOption, setValue],
  );

  const optionsData = useMemo(
    () => optionsBuilder(inputValue),
    [optionsBuilder, inputValue],
  );

  const options = useMemo(
    () => optionsData
      .map(option => ({
        data: option,
        key: getOptionKey(option),
        onClick: () => onOptionSelect(option),
      })),
    [getOptionKey, onOptionSelect, optionsData],
  );

  const fieldHasOptions = useMemo(
    () => options.length > 0,
    [options],
  );

  const showDropdown = useMemo(
    () => fieldHasOptions && dropdownIsVisible,
    [dropdownIsVisible, fieldHasOptions],
  );

  const onContainerBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      setDropdownVisibility(false);

      setInputValue(
        value === null
          ? ''
          : displayStringForOption(value),
      );

      onBlur?.(event);
    },
    [displayStringForOption, onBlur, value],
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputHasValue = Boolean(target.value.length);

      setDropdownVisibility(inputHasValue);

      setInputValue(target.value);

      if (!inputHasValue)
        setValue(null);
    },
    [setValue],
  );

  useEffect(
    () => {
      if (value !== null)
        setInputValue(
          displayStringForOption(value),
        );
    },
    [value, displayStringForOption],
  );

  return useMemo(
    () => ({
      inputValue,
      onContainerBlur,
      onInputChange,
      options,
      showDropdown,
    }),
    [
      inputValue,
      onContainerBlur,
      onInputChange,
      options,
      showDropdown,
    ],
  );
};
