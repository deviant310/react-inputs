import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { CompoundInputProps } from '../../factory/compound-input';

import {
  Container as DefaultContainer,
  Dropdown as DefaultDropdown,
  Input as DefaultInput,
} from './components';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link SelectInput.Props.displayStringForOption} parameter.
 * The options to be displayed are determined using {@link SelectInput.Props.optionsBuilder}
 * and rendered with {@link SelectInput.Props.optionComponent}.
 *
 * @label Select input
 * @group Fields
 * @example
 * ```tsx
 * [[include:examples/autocomplete-field/basic-usage.tsx]]
 * ```
 */
const SelectInput = memo(props => {
  type OptionData = typeof options[number];

  const {
    containerComponent: Container = DefaultContainer,
    displayStringForOption,
    dropdownComponent: Dropdown = DefaultDropdown,
    dropdownIsVisibleByDefault = false,
    getOptionKey,
    inputComponent: Input = DefaultInput,
    label,
    name,
    optionComponent: Option,
    optionsBuilder,
    setValue,
    value,
  } = props;

  const [dropdownIsVisible, setDropdownVisibility] = useState(dropdownIsVisibleByDefault);
  const [displayValue, setDisplayValue] = useState('');

  const options = useMemo(
    () => optionsBuilder(displayValue),
    [optionsBuilder, displayValue],
  );

  const fieldHasOptions = useMemo(
    () => options.length > 0,
    [options],
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      setDropdownVisibility(false);

      setDisplayValue(
        value === null
          ? ''
          : displayStringForOption(value),
      );
    },
    [displayStringForOption, value],
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputHasValue = Boolean(target.value.length);

      setDropdownVisibility(inputHasValue);

      setDisplayValue(target.value);

      if (!inputHasValue)
        setValue(null);
    },
    [setValue],
  );

  const onOptionSelect = useCallback(
    (option: OptionData) => {
      setDropdownVisibility(false);

      setDisplayValue(
        displayStringForOption(option),
      );

      setValue(option);
    },
    [displayStringForOption, setValue],
  );

  useEffect(
    () => {
      if (value !== null)
        setDisplayValue(
          displayStringForOption(value),
        );
    },
    [value, displayStringForOption],
  );

  return (
    <Container onBlur={onBlur} role="group" tabIndex={-1}>
      <Input
        name={name}
        onChange={onInputChange}
        placeholder={label}
        type="text"
        value={displayValue}
      />

      {fieldHasOptions && dropdownIsVisible && (
        <Dropdown role="dialog">
          {options.map(option => (
            <Option
              data={option}
              key={getOptionKey(option)}
              onClick={() => onOptionSelect(option)}
              role="option"
            />
          ))}
        </Dropdown>
      )}
    </Container>
  );
}) as SelectInput.Component;

SelectInput.displayName = 'ReactSelectInput';

namespace SelectInput {
  export interface Component extends Omit<FunctionComponent<Props<string, object>>, number> {
    <Name extends string, OptionData> (props: Props<Name, OptionData>): ReactElement;
  }

  /**
   * Autocomplete field props
   */
  export type Props<Name extends string, OptionData> = CompoundInputProps<Name, OptionData | null> & {
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

  export type ContainerProps = DefaultContainer.Props;

  export type DropdownComponent = DefaultDropdown.Component;

  export type DropdownProps = DefaultDropdown.Props;

  export type InputComponent = DefaultInput.Component;

  export type InputProps = DefaultInput.Props;

  export type OptionComponent<Data> = FunctionComponent<OptionProps<Data>>;

  export interface OptionProps<Data> {
    data: Data;
    onClick (event: MouseEvent<HTMLInputElement>): void;
    role: 'option';
  }
}

export default SelectInput;
