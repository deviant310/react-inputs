import { FieldBaseProps, FieldType } from './field';

export interface NumberFieldProps extends FieldBaseProps {
  type: FieldType.Number;
  value?: number;
  min?: number;
  max?: number;
}
