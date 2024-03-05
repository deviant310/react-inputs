import { forwardRef, memo } from 'react';

import { MaskedInput } from 'app/types/masked-input';

export const Input: MaskedInput.InputComponent = memo(forwardRef((props, ref) => (
  <input {...props} ref={ref} />
)));
