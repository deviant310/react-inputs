export enum FieldType {
  Text,
  Number,
  Autocomplete
}

export interface FieldBase {
  id: string | number;
  type: FieldType;
}
