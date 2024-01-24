import { render } from '@testing-library/react';

import { forwardRef, useState } from 'react';

import { MaskedInput } from '../../../src/app/inputs/masked-input';

test('rendering custom input component', () => {
  const Input: MaskedInput.InputComponent = forwardRef((props, ref) => (
    <input data-testid="masked-field-input" {...props} ref={ref} />
  ));

  const App = () => {
    const [phone, setPhone] = useState('+79991234567');

    return (
      <MaskedInput
        inputComponent={Input}
        mask="{+7} (000) 000-00-00"
        name="phone"
        setValue={setPhone}
        value={phone}
      />
    );
  };

  const { getByTestId } = render(<App />);
  const inputElement = getByTestId('masked-field-input');

  expect(inputElement).toBeInTheDocument();
});
