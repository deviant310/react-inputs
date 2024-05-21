import { memo } from 'react';

import { SelectInputTextBoxComponent } from '../types';

export const TextBox: SelectInputTextBoxComponent = memo(props => (
  <input {...props} />
));
