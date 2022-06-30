import React from 'react';
import '@testing-library/jest-dom';
import { getByRole, getAllByRole, fireEvent, render } from '@testing-library/react';
import {
  useForm,
  AutocompleteField,
  AutocompleteFieldOptionProps,
  AutocompleteFieldWrapperProps,
  AutocompleteFieldDropdownProps,
  AutocompleteFieldInputProps
} from '../src/main';

type Option = {
  id: number;
  value: string;
};

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteFieldOptionProps<Option>) => (
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

test('Initial value', () => {
  const country = countries[1];

  const Form = () => {
    const { data } = useForm({ country });

    return (
      <AutocompleteField
        name="country"
        selected={data.country}
        optionsBuilder={countriesOptionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        optionComponent={AutocompleteFieldOption}
      />
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(country.value);
});

test('Typing search query', () => {
  const searchQuery = countries[0].value.slice(0, 3);

  const Form = () => {
    return (
      <AutocompleteField
        name="country"
        optionsBuilder={countriesOptionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        optionComponent={AutocompleteFieldOption}
      />
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: searchQuery } });

  expect(inputElement).toHaveValue(searchQuery);
});

test('Change field value', () => {
  const country = countries[0];
  const nextCountry = countries[1];
  const nextCountryValue = nextCountry.value;
  const nextCountrySearchQuery = nextCountryValue.slice(0, 3);

  const Form = () => {
    const { data, setProperty } = useForm({ country });

    return (
      <AutocompleteField
        name="country"
        selected={data.country}
        optionsBuilder={countriesOptionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        onSelect={setProperty}
        optionComponent={AutocompleteFieldOption}
      />
    );
  };

  const { getByRole, getAllByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextCountrySearchQuery } });

  const firstOptionDropdownElement = getAllByRole('option')[0];

  fireEvent.click(firstOptionDropdownElement);

  expect(inputElement).toHaveValue(nextCountryValue);
});

test('Change multiple fields values', () => {
  const country = countries[0];
  const nextCountry = countries[1];
  const nextCountryValue = nextCountry.value;
  const nextCountrySearchQuery = nextCountryValue.slice(0, 3);

  const movie = movies[0];
  const nextMovie = movies[1];
  const nextMovieValue = nextMovie.value;
  const nextMovieSearchQuery = nextMovieValue.slice(0, 3);

  const Form = () => {
    const { data, setProperty } = useForm({ country, movie });

    return (
      <>
        <AutocompleteField
          name="country"
          selected={data.country}
          optionsBuilder={countriesOptionsBuilder}
          getOptionKey={getOptionKey}
          displayValueForOption={displayValueForOption}
          onSelect={setProperty}
          optionComponent={AutocompleteFieldOption}
        />
        <AutocompleteField
          name="movie"
          selected={data.movie}
          optionsBuilder={moviesOptionsBuilder}
          getOptionKey={getOptionKey}
          displayValueForOption={displayValueForOption}
          onSelect={setProperty}
          optionComponent={AutocompleteFieldOption}
        />
      </>
    );
  };

  const formRenderResult = render(<Form/>);

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

test('Render custom components', () => {
  const searchQuery = countries[0].value.slice(0, 3);

  const Wrapper = (props: AutocompleteFieldWrapperProps) => (
    <div data-testid="autocomplete-field-wrapper" {...props}/>
  );

  const Dropdown = (props: AutocompleteFieldDropdownProps) => (
    <div data-testid="autocomplete-field-dropdown" {...props}/>
  );

  const Input = (props: AutocompleteFieldInputProps) => (
    <input data-testid="autocomplete-field-input" {...props}/>
  );

  const Form = () => {
    return (
      <AutocompleteField
        name="country"
        optionsBuilder={countriesOptionsBuilder}
        getOptionKey={getOptionKey}
        displayValueForOption={displayValueForOption}
        optionComponent={AutocompleteFieldOption}
        wrapperComponent={Wrapper}
        dropdownComponent={Dropdown}
        inputComponent={Input}
      />
    );
  };

  const { getByTestId } = render(<Form/>);

  const wrapperElement = getByTestId('autocomplete-field-wrapper');
  const inputElement = getByTestId('autocomplete-field-input');

  expect(wrapperElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: searchQuery } });

  const dropdownElement = getByTestId('autocomplete-field-dropdown');

  expect(dropdownElement).toBeInTheDocument();
});
