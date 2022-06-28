import { ChangeEvent, FunctionComponent } from 'react';
import { BaseFieldProps } from './field';
import { FormData } from './form';

export interface NumberFieldProps<Key extends keyof FormData, Value = number> extends BaseFieldProps<Key> {
  value?: Value;
  min?: number;
  max?: number;
  onChange?: (key: Key, value: Value) => void;
  inputComponent?: FunctionComponent<NumberFieldInputProps>;
}

export interface NumberFieldInputProps {
  type: 'text';
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
