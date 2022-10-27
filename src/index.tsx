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

const AutocompleteFieldContainer = (props: AutocompleteField.ContainerProps) => (
  <span style={{ position: 'relative' }} {...props}/>
);

const AutocompleteFieldDropdown = (props: AutocompleteField.DropdownProps) => (
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

const AutocompleteFieldInput = (props: AutocompleteField.InputProps) => (
  <input className="autocomplete-field-input" {...props}/>
);

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div {...props}>
    {data.value}
  </div>
);

const TextFieldInput = (props: TextField.InputProps) => (
  <input {...props}/>
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
          optionsBuilder={editingValue => (
            countries.filter(option => option.value.includes(editingValue))
          )}
          getOptionKey={option => option.id}
          displayValueForOption={option => option.value}
          onSelect={setData}
          optionComponent={AutocompleteFieldOption}
          containerComponent={AutocompleteFieldContainer}
          dropdownComponent={AutocompleteFieldDropdown}
          inputComponent={AutocompleteFieldInput}
        />

        <AutocompleteField
          name="movie"
          selected={data.movie}
          optionsBuilder={editingValue => (
            movies.filter(option => option.value.includes(editingValue))
          )}
          getOptionKey={option => option.id}
          displayValueForOption={option => option.value}
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

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form/>
);
