import { FieldBaseProps, FieldType } from './Field';

export interface TextFieldProps extends FieldBaseProps {
  type: FieldType.Text;
  value?: string;
}
