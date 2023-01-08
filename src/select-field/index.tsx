import {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Field } from '../field';

import {
  Container as DefaultContainer,
  Dropdown as DefaultDropdown,
  Input as DefaultInput,
  Option
} from './components';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link SelectField.Props.displayStringForOption} parameter.
 * The options to be displayed are determined using {@link SelectField.Props.optionsBuilder}
 * and rendered with {@link SelectField.Props.optionComponent}.
 *
 * @label Autocomplete field
 * @group Fields
 * @example
 * ```tsx
 * [[include:examples/autocomplete-field/basic-usage.tsx]]
 * ```
 */
export const SelectField = memo(props => {
  type Name = typeof name;

  type OptionData = typeof options[number];

  type Value = typeof value;

  const {
    containerComponent: Container = DefaultContainer,
    displayStringForOption,
    dropdownComponent: Dropdown = DefaultDropdown,
    dropdownIsVisibleByDefault = false,
    getOptionKey,
    inputComponent: Input = DefaultInput,
    label,
    name,
    optionComponent: OptionComponent,
    optionsBuilder,
    setValue,
    setValueFromRecord,
    value,
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

  const setDataOrValue = useCallback(
    (value: Value) => {
      if (setValueFromRecord === true)
        setValue({ [name]: value } as Record<Name, Value> & Value);
      else
        setValue(value as Record<Name, Value> & Value);
    },
    [name, setValue, setValueFromRecord]
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      setDropdownVisibility(false);

      setDisplayValue(
        value !== null
          ? displayStringForOption(value)
          : ''
      );
    },
    [displayStringForOption, value]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputHasValue = Boolean(target.value.length);

      setDropdownVisibility(inputHasValue);

      setDisplayValue(target.value);

      if (!inputHasValue)
        setDataOrValue(null);
    },
    [setDataOrValue]
  );

  const onOptionSelect = useCallback(
    (option: OptionData) => {
      setDropdownVisibility(false);

      setDisplayValue(
        displayStringForOption(option)
      );

      setDataOrValue(option);
    },
    [displayStringForOption, setDataOrValue]
  );

  useEffect(
    () => {
      if (value !== null)
        setDisplayValue(
          displayStringForOption(value)
        );
    },
    [value, displayStringForOption]
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
          {options.map(option => (
            <Option
              component={OptionComponent}
              data={option}
              key={getOptionKey(option)}
              onSelect={onOptionSelect}
            />
          ))}
        </Dropdown>
      )}
    </Container>
  );
}) as SelectField.Component;

export namespace SelectField {
  export interface Component {
    <
      Name extends string,
      OptionData,
      SetValueFromRecord extends boolean = false
    >
    (props: Props<Name, OptionData, SetValueFromRecord>): JSX.Element;
  }

  /**
   * Autocomplete field props interface
   */
  export interface Props<
    Name extends string,
    OptionData,
    SetValueFromRecord extends boolean = false
  > extends Field.Props<Name, OptionData | null, SetValueFromRecord> {
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
    displayStringForOption (option: OptionData): string;

    dropdownComponent?: DropdownComponent;

    dropdownIsVisibleByDefault?: boolean;

    /**
     * A function that should return the unique key to identify every option component in React DOM tree.
     */
    getOptionKey (option: OptionData): string | number;

    /**
     * Custom input component
     */
    inputComponent?: InputComponent;

    /**
     * Option component from which options list are rendering
     */
    optionComponent: OptionComponent<OptionData>;

    /**
     * A function that should return the current selectable options array given the current editing value.
     */
    optionsBuilder (editingValue: string): OptionData[];
  }

  export type ContainerComponent = DefaultContainer.Component;

  export type DropdownComponent = DefaultDropdown.Component;

  export type InputComponent = DefaultInput.Component;

  export type OptionComponent<Data> = Option.Props<Data>['component'];
}
