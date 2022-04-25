import React from 'react';
import TextField from './TextField';
import NumberField from './NumberField';
import AutocompleteField from './AutocompleteField';
import { FormFieldProps } from '../types/Form';
import { FieldType } from '../types/Field';

export default function Field (props: FormFieldProps) {
  switch (props.type) {
    case FieldType.Text:
    default:
      return <TextField {...props}/>;
    case FieldType.Number:
      return <NumberField {...props}/>;
    case FieldType.Autocomplete:
      return <AutocompleteField {...props}/>;
  }
}
