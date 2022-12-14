/**
 * Dev-server entrypoint
 */

import { forwardRef, useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';

import { AutocompleteField, MaskedField, NumberField, TextField, useForm } from './main';

type Option = {
  id: number;
  value: string;
};

const Form = () => {
  const [phoneMask] = useState('+7 (###) ###-##-##');
  const [cardMask] = useState('####-####-####-####');
  const [phoneSource] = useState(String.raw`\+7|(\d)`);
  const [cardSource] = useState(String.raw`(\d)`);
  const [data, setData] = useForm(initialData);

  useEffect(() => console.log(data), [data]);

  return (
    <>
      <fieldset>
        <TextField
          inputComponent={TextFieldInput}
          name="name"
          onChange={setData}
          value={data.name}
        />

        <TextField
          name="lastName"
          onChange={setData}
          value={data.lastName}
        />
      </fieldset>

      <fieldset>
        <NumberField
          min={1}
          name="age"
          onChange={setData}
          value={data.age}
        />

        <NumberField
          min={0}
          name="salary"
          onChange={setData}
          value={data.salary}
        />
      </fieldset>

      <fieldset>
        <AutocompleteField
          containerComponent={AutocompleteFieldContainer}
          displayValueForOption={getOptionValue}
          dropdownComponent={AutocompleteFieldDropdown}
          getOptionKey={getOptionId}
          inputComponent={AutocompleteFieldInput}
          label="Country"
          name="country"
          onChange={setData}
          optionComponent={AutocompleteFieldOption}
          optionsBuilder={optionsBuilder.bind(countries)}
          selected={data.country}
        />

        <AutocompleteField
          containerComponent={AutocompleteFieldContainer}
          displayValueForOption={getOptionValue}
          dropdownComponent={AutocompleteFieldDropdown}
          getOptionKey={getOptionId}
          inputComponent={AutocompleteFieldInput}
          name="movie"
          onChange={setData}
          optionComponent={AutocompleteFieldOption}
          optionsBuilder={optionsBuilder.bind(movies)}
          selected={data.movie}
        />
      </fieldset>

      <fieldset>
        <MaskedField
          inputComponent={PhoneInput}
          mask={phoneMask}
          name="phone"
          onChange={setData}
          source={phoneSource}
          value={data.phone}
        />

        <MaskedField
          inputComponent={PhoneInput}
          mask={cardMask}
          name="card"
          onChange={setData}
          source={cardSource}
          value={data.card}
        />
      </fieldset>

      <button onClick={() => setData(initialData)}>Reset</button>
    </>
  );
};

const AutocompleteFieldContainer = (props: AutocompleteField.ContainerProps) => (
  <span style={{ position: 'relative' }} {...props} />
);

const AutocompleteFieldDropdown = (props: AutocompleteField.DropdownProps) => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid grey',
      left: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 9999
    }}
    {...props}
  />
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' }
];

const initialData = {
  age: 29,
  card: '12345678',
  country: countries[0] as Option | null,
  lastName: 'Lebedev',
  movie: movies[0] as Option | null,
  name: 'Anton',
  phone: '+79991234',
  salary: 3500
};

const AutocompleteFieldInput = forwardRef<HTMLInputElement, AutocompleteField.InputProps>((props, ref) => (
  <input {...props} ref={ref} />
));

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div {...props}>{data.value}</div>
);

const TextFieldInput = (props: TextField.InputProps) => (
  <input {...props} />
);

function optionsBuilder (this: Option[], editingValue: string) {
  return this
    .filter(
      option => option.value
        .toLowerCase()
        .includes(
          editingValue.toLowerCase()
        )
    );
}

const getOptionId = (option: Option) => option.id;
const getOptionValue = (option: Option) => option.value;

const PhoneInput: MaskedField.InputComponent = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<Form />);
