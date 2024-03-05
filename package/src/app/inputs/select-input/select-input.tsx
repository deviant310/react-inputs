import { memo } from 'react';

import { useSelectInput } from './hooks';

import {
  Container as DefaultContainer,
  Dropdown as DefaultDropdown,
  Input as DefaultInput,
} from './components';

import { SelectInputProps } from './types';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link SelectInputProps.displayStringForOption} parameter.
 * The options to be displayed are determined using {@link SelectInputProps.optionsBuilder}
 * and rendered with {@link SelectInputProps.optionComponent}.
 *
 * @category Main component
 */
export const SelectInput = memo(<Name extends string, OptionData>(props: SelectInputProps<Name, OptionData>) => {
  const {
    containerComponent: Container = DefaultContainer,
    dropdownComponent: Dropdown = DefaultDropdown,
    inputComponent: Input = DefaultInput,
    label,
    name,
    optionComponent: Option,
    ...hookProps
  } = props;

  const {
    inputValue,
    onContainerBlur,
    onInputChange,
    options,
    showDropdown,
  } = useSelectInput(hookProps);

  return (
    <Container onBlur={onContainerBlur} role="group" tabIndex={-1}>
      <Input
        name={name}
        onChange={onInputChange}
        placeholder={label}
        type="text"
        value={inputValue}
      />

      {showDropdown && (
        <Dropdown role="dialog">
          {options.map(({ data, key, onClick }) => (
            <Option
              data={data}
              key={key}
              onClick={onClick}
              role="option"
            />
          ))}
        </Dropdown>
      )}
    </Container>
  );
});

SelectInput.displayName = 'ReactInputsSelectInput';
