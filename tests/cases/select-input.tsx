import { useState } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, getAllByRole, getByRole, render } from '@testing-library/react';

import { SelectInput } from '../../src/app/inputs';

import { SelectInput as SI } from '../../src/app/types/select-input';

// TODO rename to Country
type Option = {
  id: number;
  value: string;
};

const SelectInputOption: SI.OptionComponent<Option> = ({ data, ...props }) => (
  <div data-id={data.id} {...props}>{data.value}</div>
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' },
];

const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' },
];

const countriesOptionsBuilder = (editingValue: string) => (
  countries.filter(country => country.value.includes(editingValue))
);

const moviesOptionsBuilder = (editingValue: string) => (
  movies.filter(movie => movie.value.includes(editingValue))
);

const getOptionKey = (option: Option) => option.id;
const getOptionValue = (option: Option) => option.value;

test('initial value', () => {
  const Form = () => {
    const [country, setCountry] = useState<Option | null>(countries[1]);

    return (
      <SelectInput
        displayStringForOption={getOptionValue}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={SelectInputOption}
        optionsBuilder={countriesOptionsBuilder}
        setValue={setCountry}
        value={country}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(countries[1].value);
});

test('typing search query', () => {
  const searchQuery = countries[0].value.slice(0, 3);

  const Form = () => {
    const [country, setCountry] = useState<Option | null>(null);

    return (
      <SelectInput
        displayStringForOption={getOptionValue}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={SelectInputOption}
        optionsBuilder={countriesOptionsBuilder}
        setValue={setCountry}
        value={country}
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
    const [country, setCountry] = useState<Option | null>(countries[0]);

    return (
      <SelectInput
        displayStringForOption={getOptionValue}
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={SelectInputOption}
        optionsBuilder={countriesOptionsBuilder}
        setValue={setCountry}
        value={country}
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
    const [country, setCountry] = useState<Option | null>(countries[0]);
    const [movie, setMovie] = useState<Option | null>(movies[0]);

    return (
      <>
        <SelectInput
          displayStringForOption={getOptionValue}
          getOptionKey={getOptionKey}
          name="country"
          optionComponent={SelectInputOption}
          optionsBuilder={countriesOptionsBuilder}
          setValue={setCountry}
          value={country}
        />

        <SelectInput
          displayStringForOption={getOptionValue}
          getOptionKey={getOptionKey}
          name="movie"
          optionComponent={SelectInputOption}
          optionsBuilder={moviesOptionsBuilder}
          setValue={setMovie}
          value={movie}
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

  const Container: SI.ContainerComponent = props => (
    <div data-testid="select-field-container" {...props} />
  );

  const Dropdown: SI.DropdownComponent = props => (
    <div data-testid="select-field-dropdown" {...props} />
  );

  const Input: SI.InputComponent = props => (
    <input data-testid="select-field-input" {...props} />
  );

  const Form = () => {
    const [country, setCountry] = useState<Option | null>(null);

    return (
      <SelectInput
        containerComponent={Container}
        displayStringForOption={getOptionValue}
        dropdownComponent={Dropdown}
        getOptionKey={getOptionKey}
        inputComponent={Input}
        name="country"
        optionComponent={SelectInputOption}
        optionsBuilder={countriesOptionsBuilder}
        setValue={setCountry}
        value={country}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const containerElement = getByTestId('select-field-container');
  const inputElement = getByTestId('select-field-input');

  expect(containerElement).toBeInTheDocument();

  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: searchQuery } });

  const dropdownElement = getByTestId('select-field-dropdown');

  expect(dropdownElement).toBeInTheDocument();
});

test('dropdown default visibility', () => {
  const Dropdown: SI.DropdownComponent = props => (
    <div data-testid="select-field-dropdown" {...props} />
  );

  const Form = () => {
    const [country, setCountry] = useState<Option | null>(null);

    return (
      <SelectInput
        displayStringForOption={getOptionValue}
        dropdownComponent={Dropdown}
        dropdownIsVisibleByDefault
        getOptionKey={getOptionKey}
        name="country"
        optionComponent={SelectInputOption}
        optionsBuilder={countriesOptionsBuilder}
        setValue={setCountry}
        value={country}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const dropdownElement = getByTestId('select-field-dropdown');

  expect(dropdownElement).toBeInTheDocument();
});
