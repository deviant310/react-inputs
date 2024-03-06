import {
  ChangeEvent,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes,
  RefObject,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from 'app/types/compound-input';

export interface MaskedInputProps<Name extends string> extends
  CompoundInputProps<Name, MaskedInputValue>,
  MaskedInputHookProps
{
  inputComponent?: MaskedInputCoreComponent;
}

export type MaskedInputCoreComponent =
    ForwardRefExoticComponent<PropsWithoutRef<MaskedInputCoreProps> & RefAttributes<HTMLInputElement>>;

export interface MaskedInputCoreProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  value: string;
}

export type MaskedInputValue = string;

export interface MaskedInputHook {
  (props: MaskedInputHookProps): MaskedInputHookResult;
}

export interface MaskedInputHookProps extends CompoundInputHookProps<MaskedInputValue> {
  definitions?: Record<string, RegExp>;
  mask: string;
  stub?: string;
}

export interface MaskedInputHookResult {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: MaskedInputValue;
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
