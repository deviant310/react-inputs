import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { ReactElement } from 'react';

export type FormField = TextField | NumberField;

export interface Form {
  fields: FormField[];
  renderFieldset?: (field: FormField, element: ReactElement) => ReactElement;
}
