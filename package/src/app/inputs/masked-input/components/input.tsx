import { forwardRef, memo } from 'react';

import { MaskedInputCoreComponent } from '../types';

export const Input: MaskedInputCoreComponent = memo(forwardRef((props, ref) => (
  <input {...props} ref={ref} />
)));
