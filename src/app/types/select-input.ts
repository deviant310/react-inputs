import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent, NamedExoticComponent,
  OptionHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from './compound-input';

/**
 * @beta
 */
export namespace SelectInput {
  /**
   * Select input component props
   */
  export interface Props<Name extends string, OptionData> extends
    CompoundInputProps<Name, Value<OptionData>>,
    HookProps<OptionData>
  {

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
    onBlur?(event: FocusEvent<HTMLElement>): void;

    /**
     * A function that should return the current selectable options array given the current editing value.
     */
    optionsBuilder(editingValue: string): OptionData[];
  }

  export interface HookResult<OptionData> {
    inputValue: string;
    onContainerBlur(event: FocusEvent<HTMLElement>): void;
    onInputChange(event: ChangeEvent<HTMLInputElement>): void;
    options: Array<{
      data: OptionData;
      key: OptionKey;
      onClick(event: MouseEvent<HTMLElement>): void;
    }>;
    showDropdown: boolean;
  }

  export type Value<OptionData> = OptionData | null;
}
