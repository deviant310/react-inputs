import { memo, useCallback } from 'react';

import { useSelectInput } from './hooks';

import {
  Container as DefaultContainer,
  Dropdown as DefaultDropdown,
  TextBox as DefaultTextBox,
  VirtualList,
} from './components';

import {
  SelectInputOptionItem,
  SelectInputProps,
  SelectInputVirtualListItemRenderer,
} from './types';

/**
 * A component for helping the user make a selection by entering some text and choosing from among a list of options.
 *
 * The user's text input is received by {@link SelectInputProps.displayStringForOption} parameter.
 * The options to be displayed are determined using {@link SelectInputProps.optionsBuilder}
 * and rendered with {@link SelectInputProps.optionComponent}.
 *
 * @see [Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)
 * @category Main component
 */
export const SelectInput = memo(
  <Name extends string, OptionElement extends HTMLElement, OptionData>(
    props: SelectInputProps<Name, OptionElement, OptionData>,
  ) => {
    type OptionRenderer = SelectInputVirtualListItemRenderer<OptionElement, SelectInputOptionItem<OptionData>>;

    const {
      containerComponent: Container = DefaultContainer,
      dropdownComponent: Dropdown = DefaultDropdown,
      label,
      name,
      optionComponent: Option,
      textBoxComponent: TextBox = DefaultTextBox,
      ...hookProps
    } = props;

    const {
      handleBlur,
      handleTextboxChange,
      options,
      showDropdown,
      textboxValue,
    } = useSelectInput(hookProps);

    const renderOption = useCallback<OptionRenderer>(
      (item, ref) => <Option {...item} ref={ref} role="option" />,
      [Option],
    );

    return (
      <Container onBlur={handleBlur} role="group" tabIndex={-1}>
        <TextBox
          name={name}
          onChange={handleTextboxChange}
          placeholder={label}
          role="textbox"
          value={textboxValue}
        />

        {showDropdown && (
          <Dropdown role="dialog">
            <VirtualList
              items={options}
              renderItem={renderOption}
            />
          </Dropdown>
        )}
      </Container>
    );
  },
);

SelectInput.displayName = 'ReactInputsSelectInput';
