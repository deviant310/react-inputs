import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  useForm,
  TextField,
  NumberField,
  AutocompleteField,
  AutocompleteFieldDropdownProps,
  AutocompleteFieldInputProps,
  AutocompleteFieldOptionProps,
  AutocompleteFieldWrapperProps,
} from './main';

type Option = {
  id: number;
  value: string;
};

const AutocompleteFieldWrapper = (props: AutocompleteFieldWrapperProps) => (
  <span style={{ position: 'relative' }} {...props}/>
);

const AutocompleteFieldDropdown = (props: AutocompleteFieldDropdownProps) => (
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

const AutocompleteFieldInput = (props: AutocompleteFieldInputProps) => (
  <input className="autocomplete-field-input" {...props}/>
);

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteFieldOptionProps<Option>) => {
  return (
    <div {...props}>
      {data.value}
    </div>
  );
};

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' }
];

function Form () {
  const { data, setProperty } = useForm({
    name: 'Anton',
    lastName: 'Lebedev',
    age: 29,
    salary: 3500,
    country: countries[0],
    movie: movies[0],
  });

  return (
    <>
      <fieldset>
        <TextField name="name" value={data.name} onChange={setProperty}/>
        <TextField name="lastName" value={data.lastName} onChange={setProperty}/>
      </fieldset>
      <fieldset>
        <NumberField name="age" value={data.age} min={1} onChange={setProperty}/>
        <NumberField name="salary" value={data.salary} min={0} onChange={setProperty}/>
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
          onSelect={setProperty}
          optionComponent={AutocompleteFieldOption}
          wrapperComponent={AutocompleteFieldWrapper}
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
          onSelect={setProperty}
          optionComponent={AutocompleteFieldOption}
          wrapperComponent={AutocompleteFieldWrapper}
          dropdownComponent={AutocompleteFieldDropdown}
          inputComponent={AutocompleteFieldInput}
        />
      </fieldset>
    </>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form/>
);
