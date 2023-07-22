import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from 'react-inputs';

test('typing invalid symbol', async () => {
  const App = () => {
    const [phone, setPhone] = useState('+7999123');

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
  const inputElement = getByRole('textbox');

  inputElement.focus();

  await act(() => event.type(inputElement, 'a', { skipClick: true }));

  await waitFor(() => expect(inputElement).toHaveValue('+7 (999) 123-__-__'));
});
