import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/form';
import { FormFieldProps } from './types/form';
import { FieldType } from './types/field';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Form
      fields={[
        {
          id: 1,
          type: FieldType.Text,
          value: 'hello',
        },
        {
          id: 2,
          type: FieldType.Number,
          value: 3,
        },
        {
          id: 3,
          type: FieldType.Autocomplete,
          optionsBuilder: editingValue => [
            { id: 1, value: 'one' },
            { id: 2, value: 'two' }
          ].filter(option => option.value.includes(editingValue)),
          renderOption: (option) => (
            <div key={option.id}>{option.value}</div>
          ),
          value: 'hello',
          inputStyles: {
            boxSizing: 'border-box'
          },
          dropdownStyles: {
            boxSizing: 'border-box',
            border: '1px solid grey',
            backgroundColor: 'white',
          }
        },
      ]}
      renderFieldset={(fieldProps: FormFieldProps, fieldElement: ReactElement) => (
        <fieldset>
          {fieldElement}
        </fieldset>
      )}/>
  </StrictMode>
);
