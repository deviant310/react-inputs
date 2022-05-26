import React, { ChangeEvent, useCallback, useState, useEffect, useRef } from 'react';
import {
  AutocompleteFieldInputProps,
  AutocompleteFieldProps,
  AutocompleteFieldValue
} from '../types/autocomplete-field';
import { useForm } from '../store';

function AutocompleteField<Option, ContainerElement> (props: AutocompleteFieldProps<Option, ContainerElement>) {
  const finalProps = props as typeof props & typeof AutocompleteField.defaultProps;
  const ref = useRef<HTMLElement>();
  const { formData, setFormProperty } = useForm<AutocompleteFieldValue<Option>>() ?? {};
  const [dropdownIsVisible, setDropdownVisibility] = useState(finalProps.dropdownIsVisible);
  const value = { ...AutocompleteField.defaultProps.value, ...formData?.[finalProps.name] };
  const options = finalProps.optionsBuilder(value.entered);

  type Value = typeof value;

  const getValueFromOption = useCallback((option: Option) => ({
    entered: finalProps.displayValueForOption(option),
    selected: option
  }), []);

  const setValue = useCallback((value: Value) => {
    setFormProperty !== undefined && setFormProperty(finalProps.name, value);
  }, [setFormProperty]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDropdownVisibility(Boolean(e.target.value.length));
    setValue({ entered: e.target.value });
  }, [setValue]);

  const onOptionSelect = useCallback((e: React.MouseEvent<HTMLElement>, option: Option) => {
    setDropdownVisibility(false);
    setValue(getValueFromOption(option));
  }, [setValue]);

  const renderOption = useCallback((option: Option) => (
    <finalProps.optionComponent
      key={finalProps.getOptionKey(option)}
      onClick={(e: React.MouseEvent<HTMLElement>) => onOptionSelect(e, option)}
      data={option}
    />
  ), [onOptionSelect]);

  useEffect(() => {
    if (value.selected !== undefined)
      setValue(getValueFromOption(value.selected));

    document.addEventListener('mousedown', (e: MouseEvent) => {
      if(ref.current !== undefined && !ref.current.contains(e.target as HTMLElement))
        setDropdownVisibility(false);
    });
  }, []);

  return (
    <finalProps.containerComponent ref={ref}>
      <finalProps.inputComponent
        type="text"
        value={value.entered}
        onChange={onInputChange}
      />
      {dropdownIsVisible && options.length > 0 && (
        <finalProps.dropdownComponent>
          {options.map(renderOption)}
        </finalProps.dropdownComponent>
      )}
    </finalProps.containerComponent>
  );
}

AutocompleteField.defaultProps = {
  containerComponent: (props: Record<string, unknown>) => <div {...props}/>,
  dropdownComponent: (props: Record<string, unknown>) => <div {...props}/>,
  inputComponent: (props: AutocompleteFieldInputProps) => <input {...props}/>,
  value: {
    entered: ''
  },
  dropdownIsVisible: false,
};

export default AutocompleteField;
