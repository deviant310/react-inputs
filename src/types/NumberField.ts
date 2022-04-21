import { FieldBaseProps, FieldType } from './Field';

export interface NumberFieldProps extends FieldBaseProps {
  type: FieldType.Number;
  value?: number;
  min?: number;
  max?: number;
}
