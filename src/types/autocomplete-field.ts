import {
  ChangeEvent,
  ForwardRefExoticComponent,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren, PropsWithoutRef, RefAttributes
} from 'react';
import { BaseFieldProps } from './field';

export interface AutocompleteFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AutocompleteFieldOptionProps<Data> {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  data: Data;
}

export interface AutocompleteFieldProps<Option, ContainerElement> extends BaseFieldProps {
  optionsBuilder: (editingValue: string) => Array<Option>;
  getOptionKey: (option: Option) => string | number;
  displayValueForOption: (option: Option) => string;
  optionComponent: FunctionComponent<AutocompleteFieldOptionProps<Option>>;
  containerComponent?: ForwardRefExoticComponent<PropsWithoutRef<unknown> & RefAttributes<ContainerElement>>;
  dropdownComponent?: FunctionComponent<PropsWithChildren<unknown>>;
  inputComponent?: FunctionComponent<AutocompleteFieldInputProps>;
  dropdownIsVisible?: boolean;
}

export type AutocompleteFieldValue<Option> = {
  entered?: string;
  selected?: Option;
}
