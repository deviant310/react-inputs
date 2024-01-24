import { forwardRef, memo } from 'react';

export const Input: MaskedInput.InputComponent = memo(forwardRef((props, ref) => (
  <input {...props} ref={ref} />
)));
