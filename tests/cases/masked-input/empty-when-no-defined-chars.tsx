import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from 'react-inputs';

test('empty when no defined chars', async () => {
  const App = () => {
    const [phone, setPhone] = useState('9');

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
  const { getByRole } = await render(<App />);
  const inputElement = getByRole('textbox') as HTMLInputElement;

  inputElement.focus();

  await act(() => event.type(inputElement, '{backspace}', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue(''));
});
