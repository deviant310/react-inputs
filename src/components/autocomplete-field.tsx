import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { AutocompleteFieldInputProps, AutocompleteFieldProps } from '../types/autocomplete-field';
import { FormContext } from '../store';
import { mapStateToObj } from '../helpers';
import { FormData } from '../types/form';

const Container = (props: Record<string, unknown>) => <div {...props}/>;
const Dropdown = (props: Record<string, unknown>) => <div {...props}/>;
const Input = (props: AutocompleteFieldInputProps) => <input {...props}/>;

function AutocompleteField (props: AutocompleteFieldProps & typeof AutocompleteField.defaultProps) {
  const { formData, setFormData } = useContext(FormContext)
  || mapStateToObj(useState({} as FormData), ['formData', 'setFormData'] as const);
  const [dropdownIsVisible, setDropdownVisibility] = useState(props.dropdownIsVisible);
  const value = formData[props.name] !== undefined ? formData[props.name] as string : props.value;
  const options = props.optionsBuilder(value);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDropdownVisibility(Boolean(e.target.value.length));
    setFormData({ ...formData, [props.name]: e.target.value });
  }, [formData]);

  return (
    <props.containerComponent>
      <props.inputComponent
        type="text"
        value={value}
        onChange={onChange}
      />
      {dropdownIsVisible && options.length > 0 && (
        <props.dropdownComponent>
          {options.map(props.optionComponent)}
        </props.dropdownComponent>
      )}
    </props.containerComponent>
  );
}

AutocompleteField.defaultProps = {
  containerComponent: Container,
  dropdownComponent: Dropdown,
  inputComponent: Input,
  value: '',
  dropdownIsVisible: false,
};

export default AutocompleteField;
