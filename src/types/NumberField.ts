import { FieldBase, FieldType } from './Field';

export interface NumberField extends FieldBase {
  type: FieldType.Number;
  value?: number;
  min?: number;
  max?: number;
}
