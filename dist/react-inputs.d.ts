import { ChangeEvent } from 'react';
import { Dispatch } from 'react';
import { FocusEvent as FocusEvent_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { FunctionComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { KeyboardEvent as KeyboardEvent_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { NamedExoticComponent } from 'react';
import { OptionHTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';
import { PropsWithoutRef } from 'react';
import { ReactElement } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';

/**
 * Compound input hook props interface
 */
declare interface CompoundInputHookProps<Value> {
    setValue: Dispatch<Value>;
    value: Value;
}

/**
 * Compound input props interface
 */
declare interface CompoundInputProps<Name extends string, Value> extends CompoundInputHookProps<Value> {
    label?: string;
    name?: Name;
}

export declare namespace MaskedInput {
    export interface Component extends Omit<FunctionComponent, number> {
        <Name extends string>(props: Props<Name>): ReactElement;
    }
    export interface Props<Name extends string> extends CompoundInputProps<Name, Value>, HookProps {
        inputComponent?: InputComponent;
    }
    export type InputComponent = ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>>;
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
        onInputKeyDown(event: KeyboardEvent_2<HTMLInputElement>): void;
        onInputMouseDown(event: MouseEvent_2<HTMLInputElement>): void;
    }
    export type MaskProps = {
        definitions?: MaskDefinitions;
        dirtyValue: string;
        pattern: string;
        stub: string;
    };
    export type MaskDefinitions = Record<string, RegExp>;
    export interface MaskEntry {
        source: string;
        type: MaskEntryType;
        value?: string;
    }
    export type MaskEntryType = 'include' | 'definition' | 'other';
}

export declare namespace NumberInput {
    export interface Component extends Omit<NamedExoticComponent, number> {
        <Name extends string>(props: Props<Name>): ReactElement;
    }
    export interface Props<Name extends string> extends CompoundInputProps<Name, Value>, HookProps {
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
    export interface HookProps extends CompoundInputHookProps<Value> {
    }
    export interface HookResult {
        inputValue: Value;
        onInputChange(event: ChangeEvent<HTMLInputElement>): void;
    }
    export type Value = number;
}

/**
 * @beta
 */
export declare namespace SelectInput {
    /**
     * Select input component props
     */
    export interface Props<Name extends string, OptionData> extends CompoundInputProps<Name, Value<OptionData>>, HookProps<OptionData> {
        /**
         * Custom container component
         */
        containerComponent?: ContainerComponent;
        /**
         * Custom dropdown component
         */
        dropdownComponent?: DropdownComponent;
        /**
         * Custom input component
         */
        inputComponent?: InputComponent;
        /**
         * Option component from which options list are rendering
         */
        optionComponent: OptionComponent<OptionData>;
    }
    export type ContainerComponent = FunctionComponent<ContainerProps>;
    export type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
        role: 'group';
        tabIndex: -1;
    }>;
    export type DropdownComponent = FunctionComponent<DropdownProps>;
    export type DropdownProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
        role: 'dialog';
    }>;
    export type InputComponent = FunctionComponent<InputProps>;
    export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
        type: 'text';
        value: string;
    }
    export type OptionComponent<OptionData> = FunctionComponent<OptionProps<OptionData>>;
    export type OptionKey = string | number;
    export interface OptionProps<OptionData> extends OptionHTMLAttributes<HTMLElement> {
        data: OptionData;
        role: 'option';
    }
    /**
     * Select input hook
     */
    export interface Hook {
        <OptionData>(props: HookProps<OptionData>): HookResult<OptionData>;
    }
    /**
     * Select input hook props
     */
    export interface HookProps<OptionData> extends CompoundInputHookProps<Value<OptionData>> {
        /**
         * A function that should return the string to display in the input when the option is selected.
         *
         * @param option - The first input number
         */
        displayStringForOption(option: OptionData): string;
        dropdownIsVisibleByDefault?: boolean;
        /**
         * @param option - The first input number
         */
        getOptionKey(option: OptionData): OptionKey;
        /**
         * Container blur event handler
         */
        onBlur?(event: FocusEvent_2<HTMLElement>): void;
        /**
         * A function that should return the current selectable options array given the current editing value.
         */
        optionsBuilder(editingValue: string): OptionData[];
    }
    export interface HookResult<OptionData> {
        inputValue: string;
        onContainerBlur(event: FocusEvent_2<HTMLElement>): void;
        onInputChange(event: ChangeEvent<HTMLInputElement>): void;
        options: Array<{
            data: OptionData;
            key: OptionKey;
            onClick(event: MouseEvent_2<HTMLElement>): void;
        }>;
        showDropdown: boolean;
    }
    export type Value<OptionData> = OptionData | null;
}

export declare namespace TextInput {
    export interface Component extends Omit<FunctionComponent, number> {
        <Name extends string>(props: TextInput.Props<Name>): ReactElement;
    }
    export interface Props<Name extends string> extends CompoundInputProps<Name, Value>, HookProps {
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
    export interface HookProps extends CompoundInputHookProps<Value> {
    }
    export interface HookResult {
        inputValue: Value;
        onInputChange(event: ChangeEvent<HTMLInputElement>): void;
    }
    export type Value = string;
}

export declare const useMaskedInput: MaskedInput.Hook;

export declare const useNumberInput: NumberInput.Hook;

export declare const useSelectInput: SelectInput.Hook;

export declare const useTextInput: TextInput.Hook;

export { }
