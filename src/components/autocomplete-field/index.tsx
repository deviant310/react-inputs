import {
  useCallback,
  useState,
  useEffect,
  FocusEvent,
  useMemo,
  ChangeEvent,
  memo,
  FunctionComponent,
  PropsWithChildren
} from 'react';

import Option from './components/option';

import Form from '../../types/form';

/**
 * AutocompleteField component
 * @param props
 */
function AutocompleteFieldFC<Key extends string, Option> (props: AutocompleteField.Props<Key, Option>) {
  const {
    displayValueForOption,
    dropdownComponent: Dropdown,
    getOptionKey,
    inputComponent: Input,
    name,
    label,
    onSelect,
    optionComponent,
    optionsBuilder,
    selected,
    containerComponent: Container
  } = props as typeof props & typeof AutocompleteFieldFC.defaultProps;

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

  const setSelected = useCallback(
    (option: Option | null) => onSelect?.({ [name]: option }),
    [onSelect, name]
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

      if (!inputHasValue)
        setSelected(null);
    },
    [setSelected]
  );

  const onOptionSelect = useCallback(
    (option: Option) => {
      setDropdownVisibility(false);

      setDisplayValue(displayValueForOption(option));

      setSelected(option);
    },
    [setSelected, displayValueForOption]
  );

  const renderOption = useCallback(
    (option: Option) => (
      <Option
        key={getOptionKey(option)}
        onSelect={onOptionSelect}
        data={option}
        optionComponent={optionComponent}
      />
    ),
    [optionComponent, getOptionKey, onOptionSelect]
  );

  useEffect(
    () => {
      if (selected !== null && selected !== undefined)
        setDisplayValue(
          displayValueForOption(selected)
        );
    },
    [selected, displayValueForOption]
  );

  return (
    <Container role="group" tabIndex={-1} onBlur={onBlur}>
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
}

AutocompleteFieldFC.defaultProps = {
  selected: null,
  dropdownComponent: (props: AutocompleteField.DropdownProps) => <div {...props}/>,
  inputComponent: (props: AutocompleteField.InputProps) => <input {...props}/>,
  containerComponent: (props: AutocompleteField.ContainerProps) => <div {...props}/>
};

const AutocompleteField = memo(AutocompleteFieldFC) as unknown as typeof AutocompleteFieldFC;

namespace AutocompleteField {
  export interface Props<Key extends string, Option> extends Form.FieldProps<Key> {
    /**
     * Build options array depending on editing value
     *
     * @param editingValue
     */
    optionsBuilder: (editingValue: string) => Array<Option>;
    getOptionKey: (option: Option) => string | number;
    displayValueForOption: (option: Option) => string;
    optionComponent: FunctionComponent<OptionProps<Option>>;
    selected?: Option | null;
    onSelect?: (data: Form.Data<Key, Option | null>) => void;
    containerComponent?: FunctionComponent<ContainerProps>;
    dropdownComponent?: FunctionComponent<DropdownProps>;
    inputComponent?: FunctionComponent<InputProps>;
  }

  export type ContainerProps = PropsWithChildren<{
    role: 'group';
    tabIndex: number;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  }>;

  export type DropdownProps = PropsWithChildren<{
    role: 'dialog';
  }>;

  export interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: 'text';
    value: string;
  }

  export type OptionProps<Data> = Option.ComponentProps<Data>;
}

export default AutocompleteField;
