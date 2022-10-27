import React, { forwardRef } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import useForm, { TextField } from '../src/main';

test('Initial value', () => {
  const name = 'John';

  const Form = () => {
    const [data, setData] = useForm({ name });

    return (
      <TextField name="name" value={data.name} onChange={setData}/>
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
    const [data, setData] = useForm({ name });

    return (
      <TextField name="name" value={data.name} onChange={setData}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextName } });

  expect(inputElement).toHaveValue(nextName);
});

test('Change multiple fields values', () => {
  const firstName = 'John';

  const lastName = 'Doe';

  const nextFirstName = 'Anton';

  const nextLastName = 'Lebedev';

  const Form = () => {
    const [data, setData] = useForm({ firstName, lastName });

    return (
      <>
        <TextField name="firstName" value={data.firstName} onChange={setData}/>

        <TextField name="lastName" value={data.lastName} onChange={setData}/>
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

test('Render custom input component', () => {
  const Input = forwardRef<HTMLInputElement, TextField.InputProps>((props, ref) => (
    <input data-testid="text-field-input" {...props} ref={ref}/>
  ));

  const Form = () => {
    return (
      <TextField name="name" inputComponent={Input}/>
    );
  };

  const { getByTestId } = render(<Form/>);

  const inputElement = getByTestId('text-field-input');

  expect(inputElement).toBeInTheDocument();
});
