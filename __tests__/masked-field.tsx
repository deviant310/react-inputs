import React, { forwardRef } from 'react';

import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { MaskedField, useForm } from 'react-form';

test('Initial value', () => {
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        mask="+995 ###-###-###"
        name="phone"
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
        mask="+995 ###-###-###"
        name="phone"
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

test('Check caret position', async () => {
  const event = userEvent.setup();
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        mask="+995 ###-###-###"
        name="phone"
        onChange={setData}
        source={String.raw`\+995|(\d)`}
        value={data.phone}
      />
    );
  };

  const { getByRole } = render(<Form/>);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  await event.type(inputElement, '{backspace}');

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
    /*requestAnimationFrame(() => {
      console.log('first rerender');

      resolve(undefined);
    });*/
  });

  console.log('first deleting', inputElement.selectionStart);

  await event.type(inputElement, '{backspace}');

  await new Promise(resolve => {
    requestAnimationFrame(() => {
      console.log('second rerender');

      resolve(undefined);
    });
  });

  console.log('second deleting', inputElement.selectionStart);

  await event.type(inputElement, '{backspace}');

  await new Promise(resolve => {
    requestAnimationFrame(() => {
      console.log('third rerender');

      resolve(undefined);
    });
  });

  console.log('third deleting', inputElement.selectionStart);

  console.log(inputElement.value);

  expect(inputElement.selectionStart).toEqual(12);
});

test('Edit field value', () => {
  const phone = '+995123456789';

  const Form = () => {
    const [data, setData] = useForm({ phone });

    return (
      <MaskedField
        mask="+995 ###-###-###"
        name="phone"
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
    const [data, setData] = useForm({ card, phone });

    return (
      <>
        <MaskedField
          mask="+995 ###-###-###"
          name="phone"
          onChange={setData}
          source={String.raw`\+995|(\d)`}
          value={data.phone}
        />

        <MaskedField
          mask="####-####-####-####"
          name="card"
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
        inputComponent={Input}
        mask="+995 ###-###-###"
        name="phone"
        source={String.raw`\+995|(\d)`}
      />
    );
  };

  const { getByTestId } = render(<Form/>);
  const inputElement = getByTestId('masked-field-input');

  expect(inputElement).toBeInTheDocument();
});
