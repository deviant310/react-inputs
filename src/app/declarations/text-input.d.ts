import { ChangeEvent, FunctionComponent, InputHTMLAttributes, ReactElement } from 'react';

import { CompoundInputHookProps, CompoundInputProps } from './compound-input';

export declare const TextInput: TextInput.Component;

export const useTextInput: TextInput.Hook;

export namespace TextInput {
  export interface Component extends Omit<FunctionComponent, number> {
    <Name extends string> (props: TextInput.Props<Name>): ReactElement;
  }

  export interface Props<Name extends string> extends
    CompoundInputProps<Name, Value>,
    HookProps
  {
    inputComponent?: InputComponent;
  }

  export type InputComponent = FunctionComponent<InputProps>;

  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text';
    value: string;
  }

  export interface Hook {
    (props: HookProps): HookResult;
  }

  export interface HookProps extends CompoundInputHookProps<Value> {}

  export interface HookResult {
    inputValue: Value;
    onInputChange(event: ChangeEvent<HTMLInputElement>): void;
  }

  export type Value = string;
}
