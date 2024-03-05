import { memo } from 'react';

import { SelectInputContainerComponent } from '../types';

export const Container: SelectInputContainerComponent = memo(props => (
  <div {...props} />
));
