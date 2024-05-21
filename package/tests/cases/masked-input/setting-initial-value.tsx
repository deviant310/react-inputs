import { render } from '@testing-library/react';

import { useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs';

test('setting initial value', () => {
  const App = () => {
    const [phone, setPhone] = useState('9999999999');

    return (
      <MaskedInput
        mask="{+7} (000) 000-00-00"
        name="phone"
        setValue={setPhone}
        value={phone}
      />
    );
  };

  const { getByRole } = render(<App />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('+7 (999) 999-99-99');
});
