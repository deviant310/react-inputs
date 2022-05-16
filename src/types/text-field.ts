import { FieldBaseProps, FieldType } from './field';

export interface TextFieldProps extends FieldBaseProps {
  type: FieldType.Text;
  value?: string;
}
