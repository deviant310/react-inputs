import {
  ChangeEvent,
  ForwardRefExoticComponent,
  FunctionComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  RefObject,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from './compound-input';

export declare const MaskedInput: MaskedInput.Component;

export const useMaskedInput: MaskedInput.Hook;

export namespace MaskedInput {
  export interface Component extends Omit<FunctionComponent, number> {
    <Name extends string>(props: Props<Name>): ReactElement;
  }

  export interface Props<Name extends string> extends
    CompoundInputProps<Name, Value>,
    HookProps
  {
    inputComponent?: InputComponent;
  }

  export type InputComponent =
    ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>>;

  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text';
    value: string;
  }

  export type Value = string;

  export interface Hook {
    (props: HookProps): HookResult;
  }

  export interface HookProps extends CompoundInputHookProps<Value> {
    definitions?: Record<string, RegExp>;
    mask: string;
    stub?: string;
  }

  export interface HookResult {
    inputRef: RefObject<HTMLInputElement>;
    inputValue: Value;
    onInputChange(event: ChangeEvent<HTMLInputElement>): void;
    onInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void;
    onInputMouseDown(event: MouseEvent<HTMLInputElement>): void;
  }

  export type MaskProps = {
    definitions?: MaskDefinitions;
    dirtyValue: string;
    pattern: string;
    stub: string;
  }

  export type MaskDefinitions = Record<string, RegExp>;

  export interface MaskEntry {
    source: string;
    type: MaskEntryType;
    value?: string;
  }

  export type MaskEntryType =
  | 'include'
  | 'definition'
  | 'other';
}
