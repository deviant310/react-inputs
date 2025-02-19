import { forwardRef, useState } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { NumberInput } from '../../src/app/inputs';

test('Initial value', () => {
  const initialAge = 15;

  const Form = () => {
    const [age, setAge] = useState(initialAge);

    return (
      <NumberInput
        name="age"
        setValue={setAge}
        value={age}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue(initialAge.toString());
});

test('Change field value', () => {
  const initialAge = 15;
  const nextAge = 16;

  const Form = () => {
    const [age, setAge] = useState(initialAge);

    return (
      <NumberInput
        name="age"
        setValue={setAge}
        value={age}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextAge } });

  expect(inputElement).toHaveValue(nextAge.toString());
});

test('Change multiple fields values', () => {
  const initialAge = 15;
  const nextAge = 16;
  const initialPrice = 500.50;
  const nextPrice = 700.73;

  const Form = () => {
    const [age, setAge] = useState(initialAge);
    const [price, setPrice] = useState(initialPrice);

    return (
      <>
        <NumberInput
          name="age"
          setValue={setAge}
          value={age}
        />

        <NumberInput
          name="price"
          setValue={setPrice}
          value={price}
        />
      </>
    );
  };

  const { getAllByRole } = render(<Form />);
  const inputElements = getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: nextAge } });

  fireEvent.change(inputElements[1], { target: { value: nextPrice } });

  expect(inputElements[0]).toHaveValue(nextAge.toString());

  expect(inputElements[1]).toHaveValue(nextPrice.toString());
});

test('Enter empty value', () => {
  const initialAge = 15;

  const Form = () => {
    const [age, setAge] = useState(initialAge);

    return (
      <NumberInput
        name="age"
        setValue={setAge}
        value={age}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: '' } });

  expect(inputElement).toHaveValue('0');
});

test('Check maximum allowable value', () => {
  const initialDistance = 1500;

  const Form = () => {
    const [distance, setDistance] = useState(initialDistance);

    return (
      <NumberInput
        name="distance"
        setValue={setDistance}
        value={distance}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 1e15 } });

  expect(inputElement).toHaveValue(initialDistance.toString());

  fireEvent.change(inputElement, { target: { value: 1e14 } });

  expect(inputElement).toHaveValue(1e14.toString());
});

test('Render custom input component', () => {
  const Input = forwardRef<HTMLInputElement, NumberInput.InputProps>((props, ref) => (
    <input data-testid="number-field-input" {...props} ref={ref} />
  ));

  const Form = () => {
    const [count, setCount] = useState(0);

    return (
      <NumberInput
        inputComponent={Input}
        name="count"
        setValue={setCount}
        value={count}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const inputElement = getByTestId('number-field-input');

  expect(inputElement).toBeInTheDocument();
});
