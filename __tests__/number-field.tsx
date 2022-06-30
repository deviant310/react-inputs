import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useForm, NumberField, NumberFieldInputProps } from '../src/main';

test('Initial value', () => {
  const age = 15;

  const Form = () => {
    const { data } = useForm({ age });

    return (
      <NumberField name="age" value={data.age}/>
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
    const { data, setProperty } = useForm({ age });

    return (
      <NumberField name="age" value={data.age} onChange={setProperty}/>
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
    const { data, setProperty } = useForm({ age, price });

    return (
      <>
        <NumberField name="age" value={data.age} onChange={setProperty}/>
        <NumberField name="price" value={data.price} onChange={setProperty}/>
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
    const { data, setProperty } = useForm({ age });

    return (
      <NumberField name="age" value={data.age} onChange={setProperty}/>
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
    const { data, setProperty } = useForm({ distance });

    return (
      <NumberField name="distance" value={data.distance} onChange={setProperty}/>
    );
  };

  const { getByRole } = render(<Form/>);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 1e15 } });
  expect(inputElement).toHaveValue(distance.toString());

  fireEvent.change(inputElement, { target: { value: 1e14 } });
  expect(inputElement).toHaveValue(1e14.toString());
});

test('Render custom components', () => {
  const Input = (props: NumberFieldInputProps) => (
    <input data-testid="number-field-input" {...props}/>
  );

  const Form = () => {
    return (
      <NumberField name="age" inputComponent={Input}/>
    );
  };

  const { getByTestId } = render(<Form/>);

  const inputElement = getByTestId('number-field-input');

  expect(inputElement).toBeInTheDocument();
});
