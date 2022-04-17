import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './components/Form';
import { FieldType } from './types/Field';
import { TextField } from './types/TextField';
import { NumberField } from './types/NumberField';

test('renders learn react link', () => {
  render(
    <Form
      fields={[
        {
          id: 1,
          type: FieldType.Text
        } as TextField,
        {
          id: 2,
          type: FieldType.Number,
          min: 0,
        } as NumberField
      ]}
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
