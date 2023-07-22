import { act, render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { MaskedInput } from 'react-inputs';

test('typing when several fields rendered', async () => {
  const App = () => {
    const [phone, setPhone] = useState('+7999123456');
    const [card, setCard] = useState('123456781234567');

    return (
      <>
        <MaskedInput
          mask="{+7} (000) 000-00-00"
          name="phone"
          setValue={setPhone}
          value={phone}
        />

        <MaskedInput
          mask="0000-0000-0000-0000"
          name="card"
          setValue={setCard}
          value={card}
        />
      </>
    );
  };

  const event = userEvent.setup();
  const { getAllByRole } = render(<App />);
  const inputElements = getAllByRole('textbox');

  inputElements[0].focus();

  await act(() => event.type(inputElements[0], '7', { skipClick: true }));

  await waitFor(() => expect(inputElements[0]).toHaveValue('+7 (999) 123-45-67'));

  inputElements[1].focus();

  await act(() => event.type(inputElements[1], '8', { skipClick: true }));

  await waitFor(() => expect(inputElements[1]).toHaveValue('1234-5678-1234-5678'));
});
