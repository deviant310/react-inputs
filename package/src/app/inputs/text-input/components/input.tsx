import { memo } from 'react';

import { TextInput } from '../../../types/text-input';

export const Input: TextInput.InputComponent = memo(props => (
  <input {...props} />
));
