import { useState } from 'react';

import { SelectInput, SelectInputOptionComponent } from '@copositary/react-inputs';

type Country = {
  id: number;
  value: string;
};

export const Form = () => {
  const [country, setCountry] = useState<Country | null>(countries[0]);

  return (
    <SelectInput
      displayStringForOption={getOptionValue}
      getOptionKey={getOptionKey}
      name="country"
      optionComponent={CountryOption}
      optionsBuilder={optionsBuilder}
      setValue={setCountry}
      value={country}
    />
  );
};

const countries: Country[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' },
];

const getOptionValue = (country: Country) => country.value;
const getOptionKey = (country: Country) => country.id;

const CountryOption: SelectInputOptionComponent<Country> = ({ data, ...props }) => (
  <div {...props}>{data.value}</div>
);

const optionsBuilder = (editingValue: string) => {
  return countries
    .filter(
      option => option.value
        .toLowerCase()
        .includes(
          editingValue.toLowerCase(),
        ),
    );
};
