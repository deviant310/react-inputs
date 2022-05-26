import { PropsWithChildren } from 'react';
import { AutocompleteFieldValue } from './autocomplete-field';
import { TextFieldValue } from './text-field';
import { NumberFieldValue } from './number-field';

export type FormValues = AutocompleteFieldValue<unknown> | TextFieldValue | NumberFieldValue | undefined;

export type FormData<Value extends FormValues = FormValues> = {
  [key: string]: Value;
}

export type FormProps = PropsWithChildren<{
  initialData?: FormData;
  onSubmit?: (data?: FormData) => void;
}>
