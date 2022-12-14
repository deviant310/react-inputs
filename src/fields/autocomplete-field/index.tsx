import {
  ChangeEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo, useRef, useState,
} from 'react';

import Form from '../../form';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link AutocompleteField.Props.displayValueForOption} parameter.
 * The options to be displayed are determined using {@link AutocompleteField.Props.optionsBuilder}
 * and rendered with {@link AutocompleteField.Props.optionComponent}.
 *
 * @label Autocomplete field
 * @group Fields
 * @example
 * ```tsx
 * [[include:examples/autocomplete-field/basic-usage.tsx]]
 * ```
 */
export const AutocompleteField = memo(props => {
  type Name = typeof name;

  type Option = typeof options[number];

  type Selected = typeof selected;

  const {
    containerComponent: Container = DefaultContainer,
    displayValueForOption,
    dropdownComponent: Dropdown = DefaultDropdown,
    dropdownIsVisibleByDefault = false,
    getOptionKey,
    inputComponent: Input = DefaultInput,
    label,
    name,
    onChange,
    optionComponent: Option,
    optionsBuilder,
    selected = null,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownIsVisible, setDropdownVisibility] = useState(dropdownIsVisibleByDefault);
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

      setDisplayValue(
        selected !== null
          ? displayValueForOption(selected)
          : ''
      );
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
        role="option" />
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
        ref={inputRef}
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

const DefaultContainer: AutocompleteField.ContainerComponent = props => (
  <div {...props} />
);

const DefaultDropdown: NonNullable<AutocompleteField.Props<string, unknown>['dropdownComponent']> = props => (
  <div {...props} />
);

const DefaultInput: NonNullable<AutocompleteField.Props<string, unknown>['inputComponent']> = forwardRef(
  (props, ref) => (
    <input {...props} ref={ref} />
  )
);

/**
 * @group Fields
 */
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
  export interface Props<Name extends string, Option> extends Form.FieldProps<Name> {
    /**
     * Custom container component
     * @default
     */
    containerComponent?: ContainerComponent;

    /**
     * A function that should return the string to display in the input when the option is selected.
     *
     * @param option
     */
    displayValueForOption (option: Option): string;

    dropdownComponent?: FunctionComponent<DropdownProps>;

    dropdownIsVisibleByDefault?: boolean;

    /**
     * A function that should return the unique key to identify every option component in React DOM tree.
     */
    getOptionKey (option: Option): string | number;

    /**
     * Custom input component
     */
    inputComponent?: ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>>;

    /** {@inheritDoc FieldChangeEvent} */
    onChange?: Form.FieldChangeEvent<Name, Option | null>;

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
     * @default null
     */
    selected?: Option | null;
  }

  export type ContainerComponent = FunctionComponent<ContainerProps>;

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
