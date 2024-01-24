import { memo } from 'react';

export const Input: NumberInput.InputComponent = memo(props => (
  <input {...props} />
));
