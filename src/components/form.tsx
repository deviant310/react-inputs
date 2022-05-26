import React, { useCallback, useState } from 'react';
import { FormContextProvider, FormContextDefaultValue } from '../store';
import TextField from './text-field';
import NumberField from './number-field';
import AutocompleteField from './autocomplete-field';
import Submit from './submit';
import { FormProps } from '../types/form';
import { TextFieldInputProps } from '../types/text-field';
import { NumberFieldInputProps } from '../types/number-field';
import {
  AutocompleteFieldProps,
  AutocompleteFieldOptionProps,
  AutocompleteFieldInputProps
} from '../types/autocomplete-field';
import { SubmitButtonProps } from '../types/submit';

function Form (props: FormProps) {
  const [formData, setFormData] = useState(props.initialData || {});
  const onSubmit = props.onSubmit;

  const setFormProperty = useCallback<FormContextDefaultValue['setFormProperty']>((key, value) => {
    setFormData({ ...formData, [key]: value });
  }, [formData]);

  return (
    <FormContextProvider value={{ formData, setFormProperty, onSubmit }}>
      {props.children}
    </FormContextProvider>
  );
}

export { TextField, NumberField, AutocompleteField, Submit };
export type {
  TextFieldInputProps,
  NumberFieldInputProps,
  AutocompleteFieldProps,
  AutocompleteFieldOptionProps,
  AutocompleteFieldInputProps,
  SubmitButtonProps
};
export default Form;
