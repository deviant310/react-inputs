import { memo } from 'react';

export const Input: SelectInput.InputComponent = memo(props => (
  <input {...props} />
));
