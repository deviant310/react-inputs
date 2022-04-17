import React from 'react';
import TextField from './TextField';
import NumberField from './NumberField';
import { FormField as FormFieldProps } from '../types/Form';
import { FieldType } from '../types/Field';
import { TextField as TextFieldProps } from '../types/TextField';
import { NumberField as NumberFieldProps } from '../types/NumberField';

export default function Field (props: FormFieldProps) {
  switch (props.type) {
    case FieldType.Text:
    default:
      return <TextField {...props as TextFieldProps}/>;
    case FieldType.Number:
      return <NumberField {...props as NumberFieldProps}/>;
  }
}
