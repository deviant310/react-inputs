import { ReactElement } from 'react';
import { TextFieldProps } from './text-field';
import { NumberFieldProps } from './number-field';
import { AutocompleteFieldProps } from './autocomplete-field';

export type FormFieldProps = TextFieldProps | NumberFieldProps | AutocompleteFieldProps;

export interface FormProps {
  fields: FormFieldProps[];
  renderFieldset?: (fieldProps: FormFieldProps, fieldElement: ReactElement) => ReactElement;
}
