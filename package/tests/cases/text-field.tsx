import { forwardRef, useState } from 'react';

import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { TextInput } from '../../src/app/inputs';

test('Change field value', () => {
  const initialName = 'John';
  const nextName = 'Anton';

  const Form = () => {
    const [name, setName] = useState(initialName);

    return (
      <TextInput
        name="name"
        setValue={setName}
        value={name}
      />
    );
  };

  const { getByRole } = render(<Form />);
  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: nextName } });

  expect(inputElement).toHaveValue(nextName);
});

test('Change multiple fields values', () => {
  const initialFirstName = 'John';
  const initialLastName = 'Doe';
  const nextFirstName = 'Anton';
  const nextLastName = 'Lebedev';

  const Form = () => {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);

    return (
      <>
        <TextInput
          name="firstName"
          setValue={setFirstName}
          value={firstName}
        />

        <TextInput
          name="lastName"
          setValue={setLastName}
          value={lastName}
        />
      </>
    );
  };

  const { getAllByRole } = render(<Form />);
  const inputElements = getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: nextFirstName } });

  fireEvent.change(inputElements[1], { target: { value: nextLastName } });

  expect(inputElements[0]).toHaveValue(nextFirstName);

  expect(inputElements[1]).toHaveValue(nextLastName);
});

/*test('Typing maximum number of characters', () => {

});*/

test('Render custom input component', () => {
  const Input = forwardRef<HTMLInputElement, TextInput.InputProps>((props, ref) => (
    <input data-testid="text-field-input" {...props} ref={ref} />
  ));

  const Form = () => {
    const [name, setName] = useState('');

    return (
      <TextInput
        inputComponent={Input}
        name="name"
        setValue={setName}
        value={name}
      />
    );
  };

  const { getByTestId } = render(<Form />);
  const inputElement = getByTestId('text-field-input');

  expect(inputElement).toBeInTheDocument();
});
