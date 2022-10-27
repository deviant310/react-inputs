import React, { forwardRef } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import useForm, { NumberField } from '../src/main';

test('Initial value', () => {
  const age = 15;

  const Form = () => {
    const [data, setData] = useForm({ age });

    return (
      <NumberField name="age" value={data.age} onChange={setData}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(age.toString());
});

test('Change field value', () => {
  const age = 15;

  const nextAge = 16;

  const Form = () => {
    const [data, setData] = useForm({ age });

    return (
      <NumberField name="age" value={data.age} onChange={setData}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextAge } });

  expect(inputElement).toHaveValue(nextAge.toString());
});

test('Change multiple fields values', () => {
  const age = 15;

  const nextAge = 16;

  const price = 500.50;

  const nextPrice = 700.73;

  const Form = () => {
    const [data, setData] = useForm({ age, price });

    return (
      <>
        <NumberField name="age" value={data.age} onChange={setData}/>

        <NumberField name="price" value={data.price} onChange={setData}/>
      </>
    );
  };

  const { getAllByRole } = render(<Form/>);

  const inputElements = getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: nextAge } });

  fireEvent.change(inputElements[1], { target: { value: nextPrice } });

  expect(inputElements[0]).toHaveValue(nextAge.toString());

  expect(inputElements[1]).toHaveValue(nextPrice.toString());
});

test('Enter empty value', () => {
  const age = 15;

  const Form = () => {
    const [data, setData] = useForm({ age });

    return (
      <NumberField name="age" value={data.age} onChange={setData}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: '' } });

  expect(inputElement).toHaveValue('0');
});

test('Check maximum allowable value', () => {
  const distance = 1500;

  const Form = () => {
    const [data, setData] = useForm({ distance });

    return (
      <NumberField name="distance" value={data.distance} onChange={setData}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 1e15 } });

  expect(inputElement).toHaveValue(distance.toString());

  fireEvent.change(inputElement, { target: { value: 1e14 } });

  expect(inputElement).toHaveValue(1e14.toString());
});

test('Render custom input component', () => {
  const Input = forwardRef<HTMLInputElement, NumberField.InputProps>((props, ref) => (
    <input data-testid="number-field-input" {...props} ref={ref}/>
  ));

  const Form = () => {
    return (
      <NumberField name="age" inputComponent={Input}/>
    );
  };

  const { getByTestId } = render(<Form/>);

  const inputElement = getByTestId('number-field-input');

  expect(inputElement).toBeInTheDocument();
});
