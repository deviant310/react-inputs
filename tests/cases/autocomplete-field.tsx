import React, { forwardRef } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, getAllByRole, getByRole, render } from '@testing-library/react';

import { AutocompleteField, useForm } from 'react-form';

type Option = {
  id: number;
  value: string;
};

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div data-id={data.id} {...props}>{data.value}</div>
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' }
];

const countriesOptionsBuilder = (editingValue: string) => (
  countries.filter(country => country.value.includes(editingValue))
);

const moviesOptionsBuilder = (editingValue: string) => (
  movies.filter(movie => movie.value.includes(editingValue))
);

const getOptionKey = (option: Option) => option.id;
const displayValueForOption = (option: Option) => option.value;

test('initial value', () => {
  const country = countries[1];

  const Form = () => {
    const [data] = useForm({ country });

    return (
      <AutocompleteField
        displayValueForOption={displayValueForOption}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={AutocompleteFieldOption}
        optionsBuilder={countriesOptionsBuilder}
        selected={data.country}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(country.value);
});

test('typing search query', () => {
  const searchQuery = countries[0].value.slice(0, 3);

  const Form = () => {
    return (
      <AutocompleteField
        displayValueForOption={displayValueForOption}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={AutocompleteFieldOption}
        optionsBuilder={countriesOptionsBuilder}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: searchQuery } });

  expect(inputElement).toHaveValue(searchQuery);
});

test('change field value', () => {
  const nextCountry = countries[1];
  const nextCountryValue = nextCountry.value;
  const nextCountrySearchQuery = nextCountryValue.slice(0, 3);

  const Form = () => {
    const [data, setData] = useForm({
      country: countries[0] as Option | null
    });

    return (
      <AutocompleteField
        displayValueForOption={displayValueForOption}
        getOptionKey={getOptionKey}
        name="country"
        onChange={setData}
        optionComponent={AutocompleteFieldOption}
        optionsBuilder={countriesOptionsBuilder}
        selected={data.country}
      />
    );
  };

  const { getAllByRole, getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextCountrySearchQuery } });

  const firstOptionDropdownElement = getAllByRole('option')[0];

  fireEvent.click(firstOptionDropdownElement);

  expect(inputElement).toHaveValue(nextCountryValue);
});

test('change multiple fields values', () => {
  const nextCountry = countries[1];
  const nextCountryValue = nextCountry.value;
  const nextCountrySearchQuery = nextCountryValue.slice(0, 3);
  const nextMovie = movies[1];
  const nextMovieValue = nextMovie.value;
  const nextMovieSearchQuery = nextMovieValue.slice(0, 3);

  const Form = () => {
    const [data, setData] = useForm({
      country: countries[0] as Option | null,
      movie: movies[0] as Option | null,
    });

    return (
      <>
        <AutocompleteField
          displayValueForOption={displayValueForOption}
          getOptionKey={getOptionKey}
          name="country"
          onChange={setData}
          optionComponent={AutocompleteFieldOption}
          optionsBuilder={countriesOptionsBuilder}
          selected={data.country}
        />

        <AutocompleteField
          displayValueForOption={displayValueForOption}
          getOptionKey={getOptionKey}
          name="movie"
          onChange={setData}
          optionComponent={AutocompleteFieldOption}
          optionsBuilder={moviesOptionsBuilder}
          selected={data.movie}
        />
      </>
    );
  };

  const formRenderResult = render(<Form />);
  const fieldElements = formRenderResult.getAllByRole('group');
  const countryInputElement = getByRole(fieldElements[0], 'textbox');
  const movieInputElement = getByRole(fieldElements[1], 'textbox');

  fireEvent.change(countryInputElement, { target: { value: nextCountrySearchQuery } });

  fireEvent.change(movieInputElement, { target: { value: nextMovieSearchQuery } });

  const countryFirstOptionDropdownElement = getAllByRole(fieldElements[0], 'option')[0];
  const movieFirstOptionDropdownElement = getAllByRole(fieldElements[1], 'option')[0];

  fireEvent.click(countryFirstOptionDropdownElement);

  fireEvent.click(movieFirstOptionDropdownElement);

  expect(countryInputElement).toHaveValue(nextCountryValue);

  expect(movieInputElement).toHaveValue(nextMovieValue);
});

test('render custom components', () => {
  const searchQuery = countries[0].value.slice(0, 3);

  const Container = (props: AutocompleteField.ContainerProps) => (
    <div data-testid="autocomplete-field-wrapper" {...props} />
  );

  const Dropdown = (props: AutocompleteField.DropdownProps) => (
    <div data-testid="autocomplete-field-dropdown" {...props} />
  );

  const Input = forwardRef<HTMLInputElement, AutocompleteField.InputProps>((props, ref) => (
    <input data-testid="autocomplete-field-input" {...props} ref={ref} />
  ));

  const Form = () => {
    return (
      <AutocompleteField
        containerComponent={Container}
        displayValueForOption={displayValueForOption}
        dropdownComponent={Dropdown}
        getOptionKey={getOptionKey}
        inputComponent={Input}
        name="country"
        optionComponent={AutocompleteFieldOption}
        optionsBuilder={countriesOptionsBuilder}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const wrapperElement = getByTestId('autocomplete-field-wrapper');
  const inputElement = getByTestId('autocomplete-field-input');

  expect(wrapperElement).toBeInTheDocument();

  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: searchQuery } });

  const dropdownElement = getByTestId('autocomplete-field-dropdown');

  expect(dropdownElement).toBeInTheDocument();
});

test('dropdown default visibility', () => {
  const Dropdown = (props: AutocompleteField.DropdownProps) => (
    <div data-testid="autocomplete-field-dropdown" {...props} />
  );

  const Form = () => {
    return (
      <AutocompleteField
        displayValueForOption={displayValueForOption}
        dropdownComponent={Dropdown}
        dropdownIsVisibleByDefault={true}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={AutocompleteFieldOption}
        optionsBuilder={countriesOptionsBuilder}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const dropdownElement = getByTestId('autocomplete-field-dropdown');

  expect(dropdownElement).toBeInTheDocument();
});
