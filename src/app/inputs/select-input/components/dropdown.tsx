import { memo } from 'react';

import { SelectInput } from '../../../types/select-input';

export const Dropdown: SelectInput.DropdownComponent = memo(props => (
  <div {...props} />
));
