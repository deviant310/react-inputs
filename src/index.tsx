/**
 * Dev-server entrypoint
 */

import { forwardRef, useEffect } from 'react';

import { createRoot } from 'react-dom/client';

import { AutocompleteField, MaskedField, NumberField, TextField, useForm } from './main';

type Option = {
  id: number;
  value: string;
};

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
  phone: '+79995266422',
  salary: 3500
};

const Form = () => {
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
          mask="+7 (###) ###-##-##"
          name="phone"
          onChange={setData}
          source={String.raw`\+7|(\d)`}
          value={data.phone}
        />

        <MaskedField
          inputComponent={PhoneInput}
          mask="####-####-####-####"
          name="card"
          onChange={setData}
          source={String.raw`(\d)`}
          value={data.card}
        />
      </fieldset>

      <button onClick={() => setData(initialData)}>Reset</button>
    </>
  );
};

const AutocompleteFieldContainer = (props: AutocompleteField.ContainerProps) => (
  <span style={{ position: 'relative' }} {...props}/>
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

const AutocompleteFieldInput = (props: AutocompleteField.InputProps) => (
  <input className="autocomplete-field-input" {...props}/>
);

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div {...props}>{data.value}</div>
);

const TextFieldInput = (props: TextField.InputProps) => (
  <input {...props}/>
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

const PhoneInput = forwardRef<HTMLInputElement, MaskedField.InputProps>((props, ref) => (
  <input {...props} ref={ref} />
));

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form/>
);
