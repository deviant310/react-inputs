import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs/masked-input';

test('deleting symbols from the middle', async () => {
  const App = () => {
    const [phone, setPhone] = useState('+79991234567');

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

  inputElement.setSelectionRange(17, 17);

  inputElement.focus();

  await act(() => event.type(inputElement, '{backspace}', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-45-7_'));

  await act(() => event.type(inputElement, '{backspace}', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-47-__'));

  await act(() => event.type(inputElement, '{backspace}', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-7_-__'));
});
