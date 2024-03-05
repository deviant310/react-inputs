import { memo } from 'react';

import { SelectInputDropdownComponent } from '../types';

export const Dropdown: SelectInputDropdownComponent = memo(props => (
  <div {...props} />
));
