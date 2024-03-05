import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes, NamedExoticComponent,
  ReactElement,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from './compound-input';

export namespace NumberInput {
  export interface Component extends Omit<NamedExoticComponent, number> {
    <Name extends string> (props: Props<Name>): ReactElement;
  }

  export interface Props<Name extends string> extends
    CompoundInputProps<Name, Value>,
    HookProps
  {
    inputComponent?: InputComponent;
    max?: number;
    min?: number;
  }

  export type InputComponent = FunctionComponent<InputProps>;

  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text';
    value: number;
  }

  export interface Hook {
    (props: HookProps): HookResult;
  }

  export interface HookProps extends CompoundInputHookProps<Value> {}

  export interface HookResult {
    inputValue: Value;
    onInputChange(event: ChangeEvent<HTMLInputElement>): void;
  }

  export type Value = number;
}
