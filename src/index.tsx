import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from './components/Form';
import { FormField as FormFieldProps } from './types/Form';
import { FieldType } from './types/Field';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Form
      fields={[
        {
          id: 1,
          type: FieldType.Text,
          value: 'hello'
        },
        {
          id: 2,
          type: FieldType.Number,
          value: 3,
        }
      ]}
      renderFieldset={(fieldProps: FormFieldProps, fieldElement: ReactElement) => (
        <fieldset key={fieldProps.id}>
          {fieldElement}
        </fieldset>
      )}
    />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
