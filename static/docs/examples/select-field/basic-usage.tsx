import { useState } from 'react';

import { SelectInput } from 'react-inputs';

type Option = {
  id: number;
  value: string;
};

export const Form = () => {
  const [country, setCountry] = useState<Option | null>(countries[0]);

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

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' },
];

const getOptionValue = (option: Option) => option.value;
const getOptionKey = (option: Option) => option.id;

const CountryOption: SelectInput.OptionComponent<Option> = ({ data, ...props }) => (
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
