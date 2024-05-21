import {
  ChangeEvent,
  FocusEvent, ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  OptionHTMLAttributes,
  PropsWithChildren, ReactElement, RefAttributes,
} from 'react';

import { CompoundInputHookProps, CompoundInputProps } from '../../types/compound-input';

/**
 * Select input main component props
 */
export interface SelectInputProps<
  Name extends string,
  OptionElement extends HTMLElement,
  OptionData
> extends
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
   * Option component from which options list are rendering
   */
  optionComponent: SelectInputOptionComponent<OptionElement, OptionData>;

  /**
   * Custom input component
   */
  textBoxComponent?: SelectInputTextBoxComponent;
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

export type SelectInputTextBoxComponent = FunctionComponent<SelectInputTextBoxProps>;

export interface SelectInputTextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  role: 'textbox';
  value: string;
}

export type SelectInputOptionComponent<Element extends HTMLElement, OptionData> =
  & ForwardRefExoticComponent<SelectInputOptionProps<OptionData>
  & RefAttributes<Element>>;

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
   * @param option
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
   * Event triggered when input reset
   */
  onReset?(): void;

  /**
   * Event triggered when textbox value changed
   */
  onTextboxValueChange?(value: string): void;

  /**
   * A function that should return the current selectable options array given the current editing value.
   */
  optionsBuilder(editingValue: string): OptionData[];
}

/**
 * An option object that can be used to render option element
 */
export interface SelectInputOptionItem<OptionData> {
  data: OptionData;
  key: SelectInputOptionKey;
  onClick(event: MouseEvent<HTMLElement>): void;
}

export interface SelectInputHookResult<OptionData> {
  handleBlur(event: FocusEvent<HTMLElement>): void;
  handleTextboxChange(event: ChangeEvent<HTMLInputElement>): void;
  options: Array<SelectInputOptionItem<OptionData>>;
  showDropdown: boolean;
  textboxValue: string;
}

export type SelectInputValue<OptionData> = OptionData | null;

export interface SelectInputVirtualListProps<Element extends HTMLElement, Item> {
  items: Array<Item>;
  renderItem: SelectInputVirtualListItemRenderer<Element, Item>;
}

export interface SelectInputVirtualListItemRenderer<Element extends HTMLElement, Item> {
  (item: Item, ref: (element: Element) => void, index: number): ReactElement;
}
