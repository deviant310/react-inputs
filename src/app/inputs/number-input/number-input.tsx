import { memo } from 'react';

import { NumberInput } from '../../types/number-input';

import { Input as DefaultInput } from './components';

import { useNumberInput } from './hooks';

/**
 * Number input component
 */
const NumberInput = memo(props => {
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

export { NumberInput };

NumberInput.displayName = 'ReactNumberInput';
