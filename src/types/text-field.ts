import { ChangeEvent, FunctionComponent, PropsWithChildren } from 'react';
import { BaseFieldProps } from './field';

export interface TextFieldInputProps {
  type: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldProps extends BaseFieldProps {
  value?: string;
  wrapperComponent?: FunctionComponent<PropsWithChildren<unknown>>;
  inputComponent?: FunctionComponent<TextFieldInputProps>;
}

export type TextFieldValue = string;
