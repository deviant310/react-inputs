import { memo } from 'react';

import { TextInput } from '../../types/text-input';

import { Input as DefaultInput } from './components';

import { useTextInput } from './hooks';

/**
 * Text input component
 */
const TextInput = memo(props => {
  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    ...hookProps
  } = props;

  const { inputValue, onInputChange } = useTextInput(hookProps);

  return (
    <Input
      name={name}
      onChange={onInputChange}
      placeholder={label}
      type="text"
      value={inputValue}
    />
  );
}) as TextInput.Component;

export { TextInput };

TextInput.displayName = 'ReactTextInput';
