import { forwardRef, memo } from 'react';

import { MaskedInput } from '../../../types/masked-input';

export const Input: MaskedInput.InputComponent = memo(forwardRef((props, ref) => (
  <input {...props} ref={ref} />
)));
