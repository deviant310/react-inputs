import { memo } from 'react';

import { Input as DefaultInput } from './components';

import { useNumberInput } from './hooks';

/**
 * Number field component
 */
export const NumberInput = memo(props => {
  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    ...hookProps
  } = props;

  const { inputValue, onInputChange } = useNumberInput(hookProps);

  return (
    <Input
      name={name}
      onChange={onInputChange}
      placeholder={label}
      type="text"
      value={inputValue}
    />
  );
}) as NumberInput.Component;

NumberInput.displayName = 'ReactNumberInput';
