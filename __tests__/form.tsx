import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Index, { Submit, SubmitButtonProps } from '../src/form';

test('Check submitting initial data', () => {
  const initialData = {
    one: 'One',
    two: 'Two'
  };
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <Index initialData={initialData} onSubmit={onSubmitMock}>
      <Submit>Отправить</Submit>
    </Index>
  );

  const submitButtonElement = getByRole('button');
  fireEvent.click(submitButtonElement);
  expect(onSubmitMock.mock.calls[0][0]).toBe(initialData);
});

test('Check submit button component render', () => {
  const SubmitButton = (props: SubmitButtonProps) => <div role="button" {...props}/>;

  const { getByRole } = render(
    <Index>
      <Submit buttonComponent={SubmitButton}>Отправить</Submit>
    </Index>
  );

  const submitButtonElement = getByRole('button');

  expect(submitButtonElement.nodeName).toBe('DIV');
});
