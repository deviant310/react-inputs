import { render } from '@testing-library/react';

import { useEffect, useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs/masked-input';

test('updating mask', () => {
  const App = () => {
    const [phoneMask, setPhoneMask] = useState('{+7} 000 000-00-00');
    const [phone, setPhone] = useState('123456');

    useEffect(
      () => {
        setPhoneMask('{+995} 000 000-000');

        setPhone('654321');
      },
      [],
    );

    return (
      <MaskedInput
        mask={phoneMask}
        name="phone"
        setValue={setPhone}
        value={phone}
      />
    );
  };

  const { getByRole } = render(<App />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('+995 654 321-___');
});
