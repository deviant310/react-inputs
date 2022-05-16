import React from 'react';
import TextField from './text-field';
import NumberField from './number-field';
import AutocompleteField from './autocomplete-field';
import { FormFieldProps } from '../types/form';
import { FieldType } from '../types/field';

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
