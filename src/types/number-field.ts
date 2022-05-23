import { ChangeEvent, FunctionComponent } from 'react';
import { BaseFieldProps } from './field';

export interface NumberFieldInputProps {
  type: 'text';
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface NumberFieldProps extends BaseFieldProps {
  value?: number;
  min?: number;
  max?: number;
  inputComponent?: FunctionComponent<NumberFieldInputProps>;
}
