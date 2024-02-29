import { memo } from 'react';

import { SelectInput } from '../../../types/select-input';

export const Container: SelectInput.ContainerComponent = memo(props => (
  <div {...props} />
));
