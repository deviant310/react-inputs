import { ChangeEvent, FunctionComponent } from 'react';
import { BaseFieldProps } from './field';

export interface TextFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldProps extends BaseFieldProps {
  value?: string;
  inputComponent?: FunctionComponent<TextFieldInputProps>;
}
