import { memo } from 'react';

import { SelectInputCoreComponent } from '../types';

export const Input: SelectInputCoreComponent = memo(props => (
  <input {...props} />
));
