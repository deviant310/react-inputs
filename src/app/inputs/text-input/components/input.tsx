import { memo } from 'react';

export const Input: TextInput.InputComponent = memo(props => (
  <input {...props} />
));
