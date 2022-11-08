import { AutocompleteField } from 'react-form';

type Option = {
  id: number;
  value: string;
};

export const Form = () => (
  <AutocompleteField
    displayValueForOption={getOptionValue}
    getOptionKey={getOptionKey}
    name="country"
    optionComponent={CountryOption}
    optionsBuilder={optionsBuilder}
  />
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const getOptionValue = (option: Option) => option.value;
const getOptionKey = (option: Option) => option.id;

const CountryOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div {...props}>{data.value}</div>
);

const optionsBuilder = (editingValue: string) => {
  return countries
    .filter(
      option => option.value
        .toLowerCase()
        .includes(
          editingValue.toLowerCase()
        )
    );
};
