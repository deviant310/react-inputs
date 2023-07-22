import { render } from '@testing-library/react';

import { useState } from 'react';

import { TextInput } from 'react-inputs';

test('setting initial value', () => {
  const App = () => {
    const [name, setName] = useState('John');

    return (
      <TextInput
        name="name"
        setValue={setName}
        value={name}
      />
    );
  };

  const { getByRole } = render(<App />);
  const inputElement = getByRole('textbox');

  expect(inputElement).toHaveValue('John');
});
