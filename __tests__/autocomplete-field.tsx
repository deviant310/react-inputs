import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Index, { FormData, AutocompleteField, AutocompleteFieldOptionProps, Submit } from '../src/form';
import { AutocompleteFieldValue } from '../src/types/autocomplete-field';

type Option = {
  id: number;
  value: string;
};

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteFieldOptionProps<Option>) => (
  <div role="option" data-id={data.id} {...props}>{data.value}</div>
);
const AutocompleteFieldDropdown = (props: Record<string, unknown>) => (
  <div role="dialog" {...props}/>
);
const options: Option[] = [
  { id: 1, value: 'One' },
  { id: 2, value: 'Two' }
];
const optionsBuilder = (editingValue: string) => (
  options.filter(option => option.value.includes(editingValue))
);
const getOptionKey = (option: Option) => option.id;
const displayValueForOption = (option: Option) => option.value;

test('Change field input value', () => {
  const customValue = 'Three';
  const initialData = { option: { selected: options[0] } };
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <AutocompleteField
        name="option"
        optionsBuilder={optionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        optionComponent={AutocompleteFieldOption}
        dropdownComponent={AutocompleteFieldDropdown}
      />
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElement = getByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElement).toHaveValue(options[0].value);

  fireEvent.change(inputElement, { target: { value: customValue } });
  expect(inputElement).toHaveValue(customValue);
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual<FormData<AutocompleteFieldValue<Option>>>({
    option: {
      entered: customValue
    }
  });
});

test('Select option from dropdown', () => {
  const enteredText = options[1].value.slice(0, options[1].value.length - 1);
  const initialData = { option: { selected: options[0] } };
  const onSubmitMock = jest.fn();

  const { getByRole, getAllByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <AutocompleteField
        name="option"
        optionsBuilder={optionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        optionComponent={AutocompleteFieldOption}
        dropdownComponent={AutocompleteFieldDropdown}
      />
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElement = getByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElement).toHaveValue(options[0].value);
  fireEvent.change(inputElement, { target: { value: enteredText } });
  expect(inputElement).toHaveValue(enteredText);
  const dropdownElement = getByRole('dialog');
  expect(dropdownElement).toBeInTheDocument();
  const firstOption = getAllByRole('option')[0];
  const selectedOption = options.find(({id}) => id === Number(firstOption.dataset.id));
  fireEvent.click(firstOption);
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual<FormData<AutocompleteFieldValue<Option>>>({
    option: {
      entered: selectedOption?.value,
      selected: selectedOption
    }
  });
});
