import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';

import { MaskedField } from 'react-fields';

type FormProps = {
  card?: string;
  phone?: string;
}

const phoneFieldName = 'phone';
const cardFieldName = 'card';
const phoneMask = '+7 (###) ###-##-##';
const cardMask = '####-####-####-####';
const phoneSource = String.raw`\+7|(\d)`;
const cardSource = String.raw`(\d)`;

const Input: MaskedField.InputComponent = forwardRef((props, ref) => (
  <input data-testid="masked-field-input" {...props} ref={ref} />
));

const Form = (props: FormProps) => {
  const [phone, setPhone] = useState(props.phone);
  const [card, setCard] = useState(props.card);

  return (
    <>
      {phone && (
        <MaskedField
          inputComponent={Input}
          mask={phoneMask}
          name={phoneFieldName}
          setValue={setPhone}
          source={phoneSource}
          value={phone}
        />
      )}

      {card && (
        <MaskedField
          inputComponent={Input}
          mask={cardMask}
          name={cardFieldName}
          setValue={setCard}
          source={cardSource}
          value={card}
        />
      )}
    </>
  );
};

test('setting initial value', () => {
  const phone = '+79999999999';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('+7 (999) 999-99-99');
});

test('handling dirty value', () => {
  const setPhoneMockValue = jest.fn();

  const Form = () => {
    const [phone, setPhone] = useState('123456');

    const setPhoneValue = useCallback(
      (value: string) => {
        setPhone(value);

        setPhoneMockValue(value);
      },
      []
    );

    return (
      <MaskedField
        mask={phoneMask}
        name={phoneFieldName}
        setValue={setPhoneValue}
        source={phoneSource}
        value={phone}
      />
    );
  };

  render(<Form />);

  expect(setPhoneMockValue).toBeCalledWith('+7123456');
});

test('typing symbols from the end', async () => {
  const event = userEvent.setup();
  const phone = '+79991234';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.focus();

  await event.type(inputElement, '5', { skipClick: true });

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-__'));

  await event.type(inputElement, '6', { skipClick: true });

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-6_'));

  await event.type(inputElement, '7');

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-67'));
});

test('typing new symbols from the middle', async () => {
  const event = userEvent.setup();
  const phone = '+79999999999';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.setSelectionRange(15, 15);

  inputElement.focus();

  await event.type(inputElement, '1', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(17));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 999-99-19'));

  await event.type(inputElement, '2', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(18));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 999-99-12'));
});

test('typing invalid symbol', async () => {
  const event = userEvent.setup();
  const phone = '+7999123456';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox');

  inputElement.focus();

  await event.type(inputElement, 'a', { skipClick: true });

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-6_'));
});

test('deleting symbols from the end', async () => {
  const event = userEvent.setup();
  const phone = '+79991234567';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.focus();

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(17));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-6_'));

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(15));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-__'));

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(14));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-4_-__'));
});

test('deleting symbols from the middle', async () => {
  const event = userEvent.setup();
  const phone = '+79991234567';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.setSelectionRange(17, 17);

  inputElement.focus();

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(15));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-7_'));

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(14));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-47-__'));

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(12));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-7_-__'));
});

test('setting caret start position', async () => {
  const event = userEvent.setup();
  const phone = '+79';
  const { getByRole } = render(<Form phone={phone} />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.focus();

  await event.type(inputElement, '{backspace}', { skipClick: true });

  await waitFor(() => expect(inputElement.selectionEnd).toEqual(4));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (___) ___-__-__'));
});

test('typing when several fields rendered', async () => {
  const event = userEvent.setup();
  const phone = '+7999123456';
  const card = '123456781234567';
  const { getAllByRole } = render(<Form card={card} phone={phone} />);
  const inputElements = getAllByRole('textbox');

  inputElements[0].focus();

  await event.type(inputElements[0], '7', { skipClick: true });

  inputElements[1].focus();

  await event.type(inputElements[1], '8', { skipClick: true });

  await waitFor(() => expect(inputElements[0]).toHaveValue('+7 (999) 123-45-67'));

  await waitFor(() => expect(inputElements[1]).toHaveValue('1234-5678-1234-5678'));
});

test('rendering custom input component', () => {
  const phone = '+79991234567';
  const { getByTestId } = render(<Form phone={phone} />);
  const inputElement = getByTestId('masked-field-input');

  expect(inputElement).toBeInTheDocument();
});

test('updating masked value props', () => {
  const Form = () => {
    const [phoneMask, setPhoneMask] = useState('+7 ### ###-##-##');
    const [phoneSource, setPhoneSource] = useState(String.raw`\+7|(\d)`);
    const [phone, setPhone] = useState('123456');

    useEffect(
      () => {
        setPhoneMask('+995 ### ###-###');

        setPhoneSource(String.raw`\+995|(\d)`);

        setPhone('654321');
      },
      []
    );

    return (
      <MaskedField
        mask={phoneMask}
        name={phoneFieldName}
        setValue={setPhone}
        source={phoneSource}
        value={phone}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('+995 654 321-___');
});
