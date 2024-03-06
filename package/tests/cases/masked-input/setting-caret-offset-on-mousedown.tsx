import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from 'app/inputs';

test('setting caret offset on mousedown', async () => {
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

  await act(() => event.pointer({ keys: '[MouseLeft]', offset: 0, target: inputElement }));

  await waitFor(() => expect(inputElement.selectionStart).toEqual(4));

  await act(() => event.pointer({ keys: '[MouseLeft]', offset: 8, target: inputElement }));

  await waitFor(() => expect(inputElement.selectionStart).toEqual(10));

  await act(() => event.pointer({ keys: '[MouseLeft]', offset: 20, target: inputElement }));

  await waitFor(() => expect(inputElement.selectionStart).toEqual(18));
});
