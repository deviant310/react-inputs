import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { type FieldChangeEvent, type FieldProps } from '../../form';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link AutocompleteField.Props.displayValueForOption} parameter.
 * The options to be displayed are determined using {@link AutocompleteField.Props.optionsBuilder}
 * and rendered with {@link AutocompleteField.Props.optionComponent}.
 *
 * @example
 * ```tsx
 * [[include:examples/autocomplete-field/basic-usage.tsx]]
 * ```
 *
 */
export const AutocompleteField = memo(props => {
  type Name = typeof name;

  type Option = typeof options[number];

  type Selected = typeof selected;

  const {
    containerComponent: Container = DefaultContainer,
    displayValueForOption,
    dropdownComponent: Dropdown = DefaultDropdown,
    getOptionKey,
    inputComponent: Input = DefaultInput,
    label,
    name,
    onChange,
    optionComponent: Option,
    optionsBuilder,
    selected = null,
  } = props;

  const [dropdownIsVisible, setDropdownVisibility] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  const options = useMemo(
    () => optionsBuilder(displayValue),
    [optionsBuilder, displayValue]
  );

  const fieldHasOptions = useMemo(
    () => options.length > 0,
    [options]
  );

  const setFieldData = useCallback(
    (selected: Selected) => onChange?.({ [name]: selected } as Record<Name, Selected>),
    [onChange, name]
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      setDropdownVisibility(false);

      setDisplayValue(selected !== null ? displayValueForOption(selected) : '');
    },
    [selected, displayValueForOption]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputHasValue = Boolean(target.value.length);

      setDropdownVisibility(inputHasValue);

      setDisplayValue(target.value);

      if (!inputHasValue) setFieldData(null);
    },
    [setFieldData]
  );

  const onOptionSelect = useCallback(
    (option: Option) => {
      setDropdownVisibility(false);

      setDisplayValue(displayValueForOption(option));

      setFieldData(option);
    },
    [displayValueForOption, setFieldData]
  );

  const renderOption = useCallback(
    (option: Option) => (
      <Option
        data={option}
        key={getOptionKey(option)}
        onClick={() => onOptionSelect(option)}
        role="option"/>
    ),
    [getOptionKey, onOptionSelect, Option]
  );

  useEffect(
    () => {
      if (selected !== null)
        setDisplayValue(
          displayValueForOption(selected)
        );
    },
    [selected, displayValueForOption]
  );

  return (
    <Container onBlur={onBlur} role="group" tabIndex={-1}>
      <Input
        onChange={onInputChange}
        placeholder={label}
        type="text"
        value={displayValue}
      />

      {fieldHasOptions && dropdownIsVisible && (
        <Dropdown role="dialog">
          {options.map(renderOption)}
        </Dropdown>
      )}
    </Container>
  );
}) as AutocompleteField.Component;

const DefaultContainer = (props: AutocompleteField.ContainerProps) => <div {...props}/>;
const DefaultDropdown = (props: AutocompleteField.DropdownProps) => <div {...props}/>;
const DefaultInput = (props: AutocompleteField.InputProps) => <input {...props}/>;

export namespace AutocompleteField {
  /**
   * @ignore
   */
  export interface Component {
    <Name extends string, Option> (props: Props<Name, Option>): JSX.Element;
  }

  /**
   * Autocomplete field props interface
   */
  export interface Props<Name extends string, Option> extends FieldProps<Name> {
    /**
     * Custom container component
     */
    containerComponent?: FunctionComponent<ContainerProps>;

    /**
     * A function that should return the string to display in the input when the option is selected.
     *
     * @param option
     */
    displayValueForOption (option: Option): string;
    dropdownComponent?: FunctionComponent<DropdownProps>;

    /**
     * A function that should return the unique key to identify every option component in React DOM tree.
     */
    getOptionKey (option: Option): string | number;

    /**
     * Custom input component
     */
    inputComponent?: FunctionComponent<InputProps>;

    /** {@inheritDoc FieldChangeEvent} */
    onChange?: FieldChangeEvent<Name, Option | null>;

    /**
     * Option component from which options list are rendering
     */
    optionComponent: FunctionComponent<OptionProps<Option>>;

    /**
     * A function that should return the current selectable options array given the current editing value.
     */
    optionsBuilder (editingValue: string): Option[];

    /**
     * Current selected option
     */
    selected?: Option | null;
  }

  /**
   * Autocomplete field container props interface
   */
  export type ContainerProps = PropsWithChildren<{
    onBlur (e: FocusEvent<HTMLInputElement>): void; role: 'group'; tabIndex: number;
  }>;

  /**
   * Autocomplete field dropdown props interface
   */
  export type DropdownProps = PropsWithChildren<{
    role: 'dialog';
  }>;

  /**
   * Autocomplete field input props interface
   */
  export interface InputProps {
    onChange (event: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }

  /**
   * Autocomplete field option props interface
   */
  export interface OptionProps<Data> {
    data: Data;
    onClick (event: MouseEvent<HTMLInputElement>): void;
    role: 'option';
  }
}
