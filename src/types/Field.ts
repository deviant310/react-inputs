export enum FieldType {
  Text,
  Number,
  Autocomplete
}

export interface FieldBaseProps {
  id: string | number;
  type: FieldType;
}
