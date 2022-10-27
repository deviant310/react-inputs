/**
 * Dev-server entrypoint
 */

import { useEffect } from 'react';

import { createRoot } from 'react-dom/client';

import useForm, { AutocompleteField, MaskedField, NumberField, TextField } from './main';

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
  name: 'Anton',
  lastName: 'Lebedev',
  age: 29,
  salary: 3500,
  country: countries[0] as Option | null,
  movie: movies[0] as Option | null,
  phone: '+79996',
  card: '12345678'
};

function Form () {
  const [data, setData] = useForm(initialData);

  useEffect(() => console.log(data), [data]);

  return (
    <>
      <fieldset>
        <TextField
          name="name"
          value={data.name}
          onChange={setData}
          inputComponent={TextFieldInput}
        />

        <TextField
          name="lastName"
          value={data.lastName}
          onChange={setData}
        />
      </fieldset>

      <fieldset>
        <NumberField
          name="age"
          value={data.age}
          min={1}
          onChange={setData}
        />

        <NumberField
          name="salary"
          value={data.salary}
          min={0}
          onChange={setData}
        />
      </fieldset>

      <fieldset>
        <AutocompleteField
          name="country"
          selected={data.country}
          optionsBuilder={optionsBuilder.bind(countries)}
          getOptionKey={getOptionId}
          displayValueForOption={getOptionValue}
          onSelect={setData}
          optionComponent={AutocompleteFieldOption}
          containerComponent={AutocompleteFieldContainer}
          dropdownComponent={AutocompleteFieldDropdown}
          inputComponent={AutocompleteFieldInput}
        />

        <AutocompleteField
          name="movie"
          selected={data.movie}
          optionsBuilder={optionsBuilder.bind(movies)}
          getOptionKey={getOptionId}
          displayValueForOption={getOptionValue}
          onSelect={setData}
          optionComponent={AutocompleteFieldOption}
          containerComponent={AutocompleteFieldContainer}
          dropdownComponent={AutocompleteFieldDropdown}
          inputComponent={AutocompleteFieldInput}
        />
      </fieldset>

      <fieldset>
        <MaskedField
          name="phone"
          value={data.phone}
          onChange={setData}
          source={String.raw`\+7|(\d)`}
          mask="+7 (###) ###-##-##"
        />

        <MaskedField
          name="card"
          value={data.card}
          onChange={setData}
          source={String.raw`(\d)`}
          mask="####-####-####-####"
        />
      </fieldset>

      <button onClick={() => setData(initialData)}>Reset</button>
    </>
  );
}

function AutocompleteFieldContainer (props: AutocompleteField.ContainerProps) {
  return <span style={{ position: 'relative' }} {...props}/>;
}

function AutocompleteFieldDropdown (props: AutocompleteField.DropdownProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid grey',
        zIndex: 9999
      }}
      {...props}
    />
  );
}

function AutocompleteFieldInput (props: AutocompleteField.InputProps) {
  return <input className="autocomplete-field-input" {...props}/>;
}

function AutocompleteFieldOption ({ data, ...props }: AutocompleteField.OptionProps<Option>) {
  return <div {...props}>{data.value}</div>;
}

function TextFieldInput (props: TextField.InputProps) {
  return <input {...props}/>;
}

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

function getOptionId (option: Option) {
  return option.id;
}

function getOptionValue (option: Option) {
  return option.value;
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form/>
);
