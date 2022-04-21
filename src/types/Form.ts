import { TextFieldProps } from './TextField';
import { NumberFieldProps } from './NumberField';
import { AutocompleteFieldProps } from './AutocompleteField';
import { ReactElement } from 'react';

export type FormFieldProps = TextFieldProps | NumberFieldProps | AutocompleteFieldProps;

export interface FormProps {
  fields: FormFieldProps[];
  renderFieldset?: (fieldProps: FormFieldProps, fieldElement: ReactElement) => ReactElement;
}
