import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import { BaseFieldProps } from './field';
import { FormData } from './form';

export interface AutocompleteFieldProps<Key extends keyof FormData, Option> extends BaseFieldProps<Key> {
  optionsBuilder: (editingValue: string) => Array<Option>;
  getOptionKey: (option: Option) => string | number;
  displayValueForOption: (option: Option) => string;
  optionComponent: FunctionComponent<AutocompleteFieldOptionProps<Option>>;
  selected?: Option;
  onSelect?: (key: Key, option?: Option) => void;
  wrapperComponent?: FunctionComponent<AutocompleteFieldWrapperProps>;
  dropdownComponent?: FunctionComponent<AutocompleteFieldDropdownProps>;
  inputComponent?: FunctionComponent<AutocompleteFieldInputProps>;
  dropdownIsVisible?: boolean;
}

export type AutocompleteFieldWrapperProps = PropsWithChildren<{
  role: 'group';
  tabIndex: number;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}>

export type AutocompleteFieldDropdownProps = PropsWithChildren<{
  role: 'dialog';
}>

export interface AutocompleteFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AutocompleteFieldOptionProps<Data> {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  role: 'option';
  data: Data;
}
