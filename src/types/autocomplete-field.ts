import { CSSProperties, ReactElement } from 'react';
import { FieldBaseProps, FieldType } from './field';

interface AutocompleteFieldOption {
  id: string | number;
  value: string;
}

export interface AutocompleteFieldProps extends FieldBaseProps {
  type: FieldType.Autocomplete;
  optionsBuilder: (editingValue: string) => AutocompleteFieldOption[];
  renderOption: (option: AutocompleteFieldOption) => ReactElement;
  value?: string;
  dropdownIsVisible?: boolean;
  wrapperStyles?: CSSProperties;
  inputStyles?: CSSProperties;
  dropdownStyles?: CSSProperties;
}
