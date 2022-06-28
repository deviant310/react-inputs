import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Index, { NumberField, Submit } from '../src/form';

test('Change field value', () => {
  const age = 15;
  const ageChanged = 16;
  const initialData = { age };
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <NumberField name="age"/>
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElement = getByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElement).toHaveValue(age.toString());

  fireEvent.change(inputElement, { target: { value: ageChanged } });
  expect(inputElement).toHaveValue(ageChanged.toString());
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual({ age: ageChanged });
});

test('Change multiple fields values', () => {
  const age = 15;
  const ageChanged = 16;
  const price = 500.50;
  const priceChanged = 700.73;
  const initialData = { age, price };
  const onSubmitMock = jest.fn();

  const { getByRole, getAllByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <NumberField name="age"/>
      <NumberField name="price"/>
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElements = getAllByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElements[0]).toHaveValue(age.toString());
  expect(inputElements[1]).toHaveValue(price.toString());

  fireEvent.change(inputElements[0], { target: { value: ageChanged } });
  expect(inputElements[0]).toHaveValue(ageChanged.toString());
  fireEvent.change(inputElements[1], { target: { value: priceChanged } });
  expect(inputElements[1]).toHaveValue(priceChanged.toString());
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual({ age: ageChanged, price: priceChanged });
});

test('Enter empty value', () => {
  const age = 15;
  const initialData = { age };
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <NumberField name="age"/>
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElement = getByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElement).toHaveValue(age.toString());

  fireEvent.change(inputElement, { target: { value: '' } });
  expect(inputElement).toHaveValue('0');
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual({ age: 0 });
});

test('Check maximum allowable value', () => {
  const distance = 1500;
  const initialData = { distance };
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <NumberField name="distance"/>
      <Submit>Отправить</Submit>
    </Index>
  );

  const inputElement = getByRole('textbox');
  const submitButtonElement = getByRole('button');

  expect(inputElement).toHaveValue(distance.toString());

  fireEvent.change(inputElement, { target: { value: 1e15 } });
  expect(inputElement).toHaveValue(distance.toString());
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toEqual({ distance });

  fireEvent.change(inputElement, { target: { value: 1e14 } });
  expect(inputElement).toHaveValue(1e14.toString());
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[1][0]).toEqual({ distance: 1e14 });
});
