import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useForm, TextField, TextFieldInputProps } from '../src/main';

test('Initial value', () => {
  const name = 'John';

  const Form = () => {
    const { data } = useForm({ name });

    return (
      <TextField name="name" value={data.name}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(name);
});

test('Change field value', () => {
  const name = 'John';
  const nextName = 'Anton';

  const Form = () => {
    const { data, setProperty } = useForm({ name });

    return (
      <TextField name="name" value={data.name} onChange={setProperty}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextName } });

  expect(inputElement).toHaveValue(nextName);
});

test('Change multiple fields values', () => {
  const firstName = 'John';
  const nextFirstName = 'Anton';

  const lastName = 'Doe';
  const nextLastName = 'Lebedev';

  const Form = () => {
    const { data, setProperty } = useForm({ firstName, lastName });

    return (
      <>
        <TextField name="firstName" value={data.firstName} onChange={setProperty}/>
        <TextField name="lastName" value={data.lastName} onChange={setProperty}/>
      </>
    );
  };

  const { getAllByRole } = render(<Form/>);

  const inputElements = getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: nextFirstName } });
  fireEvent.change(inputElements[1], { target: { value: nextLastName } });

  expect(inputElements[0]).toHaveValue(nextFirstName);
  expect(inputElements[1]).toHaveValue(nextLastName);
});

/*test('Typing maximum number of characters', () => {

});*/

test('Render custom components', () => {
  const Input = (props: TextFieldInputProps) => (
    <input data-testid="text-field-input" {...props}/>
  );

  const Form = () => {
    return (
      <TextField name="name" inputComponent={Input}/>
    );
  };

  const { getByTestId } = render(<Form/>);

  const inputElement = getByTestId('text-field-input');

  expect(inputElement).toBeInTheDocument();
});
