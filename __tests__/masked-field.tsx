import React, { forwardRef } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import useForm, { MaskedField } from '../src/main';

test('Initial value', () => {
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        name="phone"
        mask="+995 ###-###-###"
        onChange={setData}
        source={String.raw`\+995|(\d)`}
        value={data.phone}
      />
    );
  };

  const { getByRole } = render(<Form/>);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('+995 123-456-789');
});

test('Change field value', () => {
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        name="phone"
        mask="+995 ###-###-###"
        onChange={setData}
        source={String.raw`\+995|(\d)`}
        value={data.phone}
      />
    );
  };

  const { getByRole } = render(<Form/>);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: '+995j frejn 999 jj44t3k3mb28' } });

  expect(inputElement).toHaveValue('+995 999-443-328');
});

test('Edit field value', () => {
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        name="phone"
        mask="+995 ###-###-###"
        onChange={setData}
        source={String.raw`\+995|(\d)`}
        value={data.phone}
      />
    );
  };

  const { getByRole } = render(<Form/>);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: '+995 999-443' } });

  expect(inputElement).toHaveValue('+995 999-443-___');
});

test('Change multiple fields values', () => {
  const phone = '+995123456789';
  const card = '1234567812345678';

  const Form = () => {
    const [data, setData] = useForm({ phone, card });

    return (
      <>
        <MaskedField
          name="phone"
          mask="+995 ###-###-###"
          onChange={setData}
          source={String.raw`\+995|(\d)`}
          value={data.phone}
        />

        <MaskedField
          name="card"
          mask="####-####-####-####"
          onChange={setData}
          source={String.raw`(\d)`}
          value={data.card}
        />
      </>
    );
  };

  const { getAllByRole } = render(<Form/>);
  const inputElements = getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: '+995987654321' } });

  fireEvent.change(inputElements[1], { target: { value: '8765432187654321' } });

  expect(inputElements[0]).toHaveValue('+995 987-654-321');

  expect(inputElements[1]).toHaveValue('8765-4321-8765-4321');
});

test('Render custom input component', () => {
  const Input = forwardRef<HTMLInputElement, MaskedField.InputProps>((props, ref) => (
    <input data-testid="masked-field-input" {...props} ref={ref}/>
  ));

  const Form = () => {
    return (
      <MaskedField
        name="phone"
        mask="+995 ###-###-###"
        source={String.raw`\+995|(\d)`}
        inputComponent={Input}
      />
    );
  };

  const { getByTestId } = render(<Form/>);
  const inputElement = getByTestId('masked-field-input');

  expect(inputElement).toBeInTheDocument();
});
