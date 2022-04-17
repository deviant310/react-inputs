import { FieldBase, FieldType } from './Field';

export interface TextField extends FieldBase {
  type: FieldType.Text;
  value?: string;
}
