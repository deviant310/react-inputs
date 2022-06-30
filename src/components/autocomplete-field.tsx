import React, { useCallback, useState, useEffect, FocusEvent } from 'react';
import {
  AutocompleteFieldProps,
  AutocompleteFieldWrapperProps,
  AutocompleteFieldInputProps, AutocompleteFieldDropdownProps
} from '../types/autocomplete-field';
import { FormData } from '../types/form';

/**
 * AutocompleteField component
 * @param rawProps
 */
function AutocompleteField<Key extends keyof FormData, Option> (rawProps: AutocompleteFieldProps<Key, Option>) {
  const props = rawProps as typeof rawProps & typeof AutocompleteField.defaultProps;
  const [dropdownIsVisible, setDropdownVisibility] = useState(props.dropdownIsVisible);
  const [displayValue, setDisplayValue] = useState(props.initialValue);
  const options = props.optionsBuilder(displayValue);

  const onSelect = useCallback(
    (option?: Option) => {
      if (props.onSelect !== undefined)
        props.onSelect(props.name, option);
    },
    [props.onSelect, props.name]
  );

  const onBlur = ({ currentTarget, relatedTarget }: FocusEvent<HTMLInputElement>) => {
    if (!currentTarget.contains(relatedTarget)) {
      setDropdownVisibility(false);
      setDisplayValue(
        props.selected !== undefined ? props.displayValueForOption(props.selected) : props.initialValue
      );
    }
  };

  const onInputChange = useCallback<AutocompleteFieldInputProps['onChange']>(
    ({ target }) => {
      const isFilled = Boolean(target.value.length);

      setDropdownVisibility(isFilled);
      setDisplayValue(target.value);

      if(!isFilled)
        onSelect(undefined);
    },
    [onSelect]
  );

  const onOptionSelect = useCallback(
    (option: Option) => {
      setDropdownVisibility(false);
      setDisplayValue(props.displayValueForOption(option));
      onSelect(option);
    },
    [props.displayValueForOption, onSelect]
  );

  const renderOption = useCallback(
    (option: Option) => (
      <props.optionComponent
        key={props.getOptionKey(option)}
        role="option"
        onClick={() => onOptionSelect(option)}
        data={option}
      />
    ),
    [props.optionComponent, props.getOptionKey, onOptionSelect]
  );

  useEffect(() => {
    if (props.selected !== undefined)
      setDisplayValue(props.displayValueForOption(props.selected));
  }, []);

  return (
    <props.wrapperComponent role="group" tabIndex={0} onBlur={onBlur}>
      <props.inputComponent
        type="text"
        value={displayValue}
        onChange={onInputChange}
      />
      {dropdownIsVisible && options.length > 0 && (
        <props.dropdownComponent role="dialog">
          {options.map(renderOption)}
        </props.dropdownComponent>
      )}
    </props.wrapperComponent>
  );
}

AutocompleteField.defaultProps = {
  initialValue: '',
  wrapperComponent: (props: AutocompleteFieldWrapperProps) => <div {...props}/>,
  dropdownComponent: (props: AutocompleteFieldDropdownProps) => <div {...props}/>,
  inputComponent: (props: AutocompleteFieldInputProps) => <input {...props}/>,
  dropdownIsVisible: false,
};

export default AutocompleteField;
