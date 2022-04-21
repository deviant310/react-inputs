import React from 'react';
import TextField from './TextField';
import NumberField from './NumberField';
import AutocompleteField from './AutocompleteField';
import { FormFieldProps } from '../types/Form';
import { FieldType } from '../types/Field';
import { TextFieldProps } from '../types/TextField';
import { NumberFieldProps } from '../types/NumberField';
import { AutocompleteFieldProps } from '../types/AutocompleteField';

export default function Field (props: FormFieldProps) {
  switch (props.type) {
    case FieldType.Text:
    default:
      return <TextField {...props as TextFieldProps}/>;
    case FieldType.Number:
      return <NumberField {...props as NumberFieldProps}/>;
    case FieldType.Autocomplete:
      return <AutocompleteField {...props as AutocompleteFieldProps}/>;
  }
}
