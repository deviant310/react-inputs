import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/form';
import TextField from './components/text-field';
import NumberField from './components/number-field';
import AutocompleteField from './components/autocomplete-field';
import { AutocompleteFieldInputProps, AutocompleteFieldOptionProps } from './types/autocomplete-field';
import Submitter from './components/submitter';
import { SubmitterButtonProps } from './types/submitter';

const AutocompleteFieldOption = (props: AutocompleteFieldOptionProps) => (
  <div key={props.id}>{props.value}</div>
);

const AutocompleteFieldContainer = (props: Record<string, unknown>) => (
  <div style={{ position: 'relative' }} {...props}/>
);

const AutocompleteFieldDropdown = (props: Record<string, unknown>) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid grey'
    }}
    {...props}
  />
);

const AutocompleteFieldInput = (props: AutocompleteFieldInputProps) => (
  <div>
    <input {...props}/>
  </div>
);

const autocompleteFieldData = [
  { id: 1, value: 'Russia' },
  { id: 2, value: 'Georgia' }
];

const SubmitButton = (props: SubmitterButtonProps) => <button {...props}>Отправить</button>;

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Form initialData={{name: 'Anton', age: 67, country: 'Russia'}}>
      <fieldset>
        <TextField
          name="name"
        />
      </fieldset>
      <fieldset>
        <NumberField
          name="age"
          min={1}
        />
      </fieldset>
      <fieldset>
        <AutocompleteField
          name="country"
          optionsBuilder={editingValue => autocompleteFieldData
            .filter(option => option.value.includes(editingValue))}
          optionComponent={AutocompleteFieldOption}
          containerComponent={AutocompleteFieldContainer}
          dropdownComponent={AutocompleteFieldDropdown}
          inputComponent={AutocompleteFieldInput}
        />
      </fieldset>
      <Submitter
        onSubmit={(e, data) => {
          console.log(data);
        }}
        buttonComponent={SubmitButton}
      />
    </Form>
  </StrictMode>
);
