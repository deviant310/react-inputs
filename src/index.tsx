import React, { forwardRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  useForm,
  TextField,
  NumberField,
  AutocompleteField,
  AutocompleteFieldInputProps,
  AutocompleteFieldOptionProps,
} from './main';

type Country = {
  id: number;
  value: string;
};

const AutocompleteFieldWrapper = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} tabIndex={0} style={{ position: 'relative' }} {...props}/>
));

const AutocompleteFieldDropdown = (props: unknown) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid grey',
      zIndex: 9999
    }}
    {...props}
  />
);

const AutocompleteFieldInput = (props: AutocompleteFieldInputProps) => (
  <div>
    <input {...props}/>
  </div>
);

const AutocompleteFieldOption = ({ data, ...props }: AutocompleteFieldOptionProps<Country>) => {
  return (
    <div {...props}>
      {data.value}
    </div>
  );
};

const countries: Country[] = [
  { id: 1, value: 'Russia' },
  { id: 2, value: 'Georgia' }
];

function Form () {
  const { data, setProperty } = useForm({
    name: 'Anton',
    age: 29,
    country: countries[0],
    phones: []
  });

  return (
    <>
      <fieldset>
        <TextField name="name" value={data.name} onChange={setProperty}/>
      </fieldset>
      <fieldset>
        <NumberField name="age" value={data.age} min={1} onChange={setProperty}/>
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
      </fieldset>
    </>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form/>
);
