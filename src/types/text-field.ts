import { ChangeEvent, FunctionComponent } from 'react';
import { BaseFieldProps } from './field';
import { FormData } from './form';

export interface TextFieldProps<Key extends keyof FormData, Value = string> extends BaseFieldProps<Key> {
  value?: Value;
  onChange?: (key: Key, value: Value) => void;
  inputComponent?: FunctionComponent<TextFieldInputProps>;
}

export interface TextFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
