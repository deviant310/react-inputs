import React, { forwardRef } from 'react';
import { createRoot } from 'react-dom/client';
import Form, {
  TextField,
  NumberField,
  AutocompleteField,
  Submit,
  AutocompleteFieldInputProps,
  AutocompleteFieldOptionProps,
  SubmitButtonProps
} from './components/form';

type Country = {
  id: number;
  value: string;
};

const AutocompleteFieldContainer = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ position: 'relative' }} {...props}/>
));

const AutocompleteFieldDropdown = (props: unknown) => (
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

const SubmitButton = (props: SubmitButtonProps) => <div {...props}/>;

createRoot(document.getElementById('root') as HTMLElement).render(
  <Form
    initialData={{
      name: 'Anton',
      age: 67,
      country: {
        selected: countries[1]
      }
    }
    }
    onSubmit={(data) => {
      console.log(data);
    }}
  >
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
        optionsBuilder={editingValue => (
          countries.filter(option => option.value.includes(editingValue))
        )}
        getOptionKey={option => option.id}
        displayValueForOption={option => option.value}
        optionComponent={AutocompleteFieldOption}
        containerComponent={AutocompleteFieldContainer}
        dropdownComponent={AutocompleteFieldDropdown}
        inputComponent={AutocompleteFieldInput}
      />
    </fieldset>
    <Submit buttonComponent={SubmitButton}>Отправить</Submit>
  </Form>
);
