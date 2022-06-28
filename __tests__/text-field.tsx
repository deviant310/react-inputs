import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useForm, TextField } from '../src/main';

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

  expect(inputElement).toHaveValue(name);

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

  expect(inputElements[0]).toHaveValue(firstName);
  expect(inputElements[1]).toHaveValue(lastName);

  fireEvent.change(inputElements[0], { target: { value: nextFirstName } });
  expect(inputElements[0]).toHaveValue(nextFirstName);
  fireEvent.change(inputElements[1], { target: { value: nextLastName } });
  expect(inputElements[0]).toHaveValue(nextFirstName);
  expect(inputElements[1]).toHaveValue(nextLastName);
});

test('Check maximum number of input characters', () => {

});
