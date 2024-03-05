import { memo } from 'react';

import { NumberInput } from '../../../types/number-input';

export const Input: NumberInput.InputComponent = memo(props => (
  <input {...props} />
));
