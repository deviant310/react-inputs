import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/Form';
import { FormFieldProps } from './types/Form';
import { FieldType } from './types/Field';
import reportWebVitals from './reportWebVitals';

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
          id: 1,
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
      )}></Form>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
