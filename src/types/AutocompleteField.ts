import { FieldBaseProps, FieldType } from './Field';

export interface AutocompleteFieldProps extends FieldBaseProps {
  type: FieldType.Autocomplete;
  value?: string;
}
