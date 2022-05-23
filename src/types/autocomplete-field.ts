import { ChangeEvent, FunctionComponent, PropsWithChildren } from 'react';
import { BaseFieldProps } from './field';

export interface AutocompleteFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AutocompleteFieldOptionProps {
  id: string | number;
  value: string;
}

export interface AutocompleteFieldProps extends BaseFieldProps {
  optionsBuilder: (editingValue: string) => AutocompleteFieldOptionProps[];
  optionComponent: FunctionComponent<AutocompleteFieldOptionProps>;
  containerComponent?: FunctionComponent<PropsWithChildren<unknown>>;
  dropdownComponent?: FunctionComponent<PropsWithChildren<unknown>>;
  inputComponent?: FunctionComponent<AutocompleteFieldInputProps>;
  value?: string;
  dropdownIsVisible?: boolean;
}
