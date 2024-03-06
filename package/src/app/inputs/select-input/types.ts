import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  OptionHTMLAttributes,
  PropsWithChildren,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from 'app/types/compound-input';

/**
 * Select input main component props
 */
export interface SelectInputProps<Name extends string, OptionData> extends
  CompoundInputProps<Name, SelectInputValue<OptionData>>,
  SelectInputHookProps<OptionData>
{

  /**
   * Custom container component
   */
  containerComponent?: SelectInputContainerComponent;

  /**
   * Custom dropdown component
   */
  dropdownComponent?: SelectInputDropdownComponent;

  /**
   * Custom input component
   */
  inputComponent?: SelectInputCoreComponent;

  /**
   * Option component from which options list are rendering
   */
  optionComponent: SelectInputOptionComponent<OptionData>;
}

/**
 * Select input container component
 */
export interface SelectInputContainerComponent extends FunctionComponent<SelectInputContainerProps> {}

/**
 * Select input container props
 *
 * @interface
 */
export type SelectInputContainerProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
  role: 'group';
  tabIndex: -1;
}>;

export type SelectInputDropdownComponent = FunctionComponent<SelectInputDropdownProps>;

export type SelectInputDropdownProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
  role: 'dialog';
}>;

export type SelectInputCoreComponent = FunctionComponent<SelectInputCoreProps>;

export interface SelectInputCoreProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text';
  value: string;
}

export type SelectInputOptionComponent<OptionData> = FunctionComponent<SelectInputOptionProps<OptionData>>;

export type SelectInputOptionKey = string | number;

export interface SelectInputOptionProps<OptionData> extends OptionHTMLAttributes<HTMLElement> {
  data: OptionData;
  role: 'option';
}

/**
 * Select input hook
 */
export interface SelectInputHook {
  <OptionData>(props: SelectInputHookProps<OptionData>): SelectInputHookResult<OptionData>;
}

/**
 * Select input hook props
 */
export interface SelectInputHookProps<OptionData> extends CompoundInputHookProps<SelectInputValue<OptionData>> {

  /**
   * A function that should return the string to display in the input when the option is selected.
   *
   * @param option - Data of selected option
   */
  displayStringForOption(option: OptionData): string;

  dropdownIsVisibleByDefault?: boolean;

  /**
   * A function that should return option key.
   *
   * @param option - Data of selected option
   */
  getOptionKey(option: OptionData): SelectInputOptionKey;

  /**
   * Container blur event handler
   */
  onBlur?(event: FocusEvent<HTMLElement>): void;

  /**
   * A function that should return the current selectable options array given the current editing value.
   */
  optionsBuilder(editingValue: string): OptionData[];
}

/**
 * An option object that can be used to render option element
 */
export interface SelectInputOption<OptionData> {
  data: OptionData;
  key: SelectInputOptionKey;
  onClick(event: MouseEvent<HTMLElement>): void;
}

export interface SelectInputHookResult<OptionData> {
  inputValue: string;
  onContainerBlur(event: FocusEvent<HTMLElement>): void;
  onInputChange(event: ChangeEvent<HTMLInputElement>): void;
  options: Array<SelectInputOption<OptionData>>;
  showDropdown: boolean;
}

export type SelectInputValue<OptionData> = OptionData | null;
