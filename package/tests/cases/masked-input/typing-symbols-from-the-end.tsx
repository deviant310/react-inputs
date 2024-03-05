import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs/masked-input';

test('typing symbols from the end', async () => {
  const App = () => {
    const [phone, setPhone] = useState('+79991234');

    return (
      <MaskedInput
        mask="{+7} (000) 000-00-00"
        name="phone"
        setValue={setPhone}
        value={phone}
      />
    );
  };

  const event = userEvent.setup();
  const { getByRole } = render(<App />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.focus();

  await act(() => event.type(inputElement, '5', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-__'));

  await act(() => event.type(inputElement, '6', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-6_'));

  await act(() => event.type(inputElement, '7', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-67'));
});
