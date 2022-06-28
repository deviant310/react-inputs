import {
  ChangeEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import { BaseFieldProps } from './field';
import { FormData } from './form';

export interface AutocompleteFieldProps<Key extends keyof FormData, Option, ContainerElement extends HTMLElement> extends BaseFieldProps<Key> {
  optionsBuilder: (editingValue: string) => Array<Option>;
  getOptionKey: (option: Option) => string | number;
  displayValueForOption: (option: Option) => string;
  optionComponent: FunctionComponent<AutocompleteFieldOptionProps<Option>>;
  selected?: Option;
  onSelect?: (key: Key, option?: Option) => void;
  wrapperComponent?: ForwardRefExoticComponent<PropsWithoutRef<unknown> & RefAttributes<ContainerElement>>;
  dropdownComponent?: FunctionComponent<PropsWithChildren<unknown>>;
  inputComponent?: FunctionComponent<AutocompleteFieldInputProps>;
  dropdownIsVisible?: boolean;
}

export type AutocompleteFieldWrapperProps = PropsWithChildren<{
  tabIndex: number;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}>

export type AutocompleteFieldDropdownProps = PropsWithChildren<unknown>

export interface AutocompleteFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AutocompleteFieldOptionProps<Data> {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  data: Data;
}
