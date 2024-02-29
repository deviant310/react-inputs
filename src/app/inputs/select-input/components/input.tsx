import { memo } from 'react';

import { SelectInput } from '../../../types/select-input';

export const Input: SelectInput.InputComponent = memo(props => (
  <input {...props} />
));
