import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs';

test('typing symbols from the middle', async () => {
  const App = () => {
    const [phone, setPhone] = useState('+79999999999');

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

  inputElement.setSelectionRange(14, 14);

  await act(() => event.type(inputElement, '1', { skipClick: true }));

  await waitFor(() => expect(inputElement.value).toEqual('+7 (999) 999-91-99'));

  await act(() => event.type(inputElement, '2', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 999-91-29'));

  await act(() => event.type(inputElement, '3', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 999-91-23'));
});
