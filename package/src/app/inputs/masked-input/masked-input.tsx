import { memo } from 'react';

import { MaskedInput } from '../../types/masked-input';

import { Input as DefaultInput } from './components';

import { useMaskedInput } from './hooks';

/**
 * A component for helping the user entering some text by configured mask.
 *
 * Input pattern is determined by {@link MaskedInput.Props.mask} parameter.
 * The user's text input is controlled by {@link MaskedInput.Props.source} parameter.
 */
const MaskedInput = memo(props => {
  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    ...hookProps
  } = props;

  const {
    inputRef,
    inputValue,
    onInputChange,
    onInputKeyDown,
    onInputMouseDown,
  } = useMaskedInput(hookProps);

  return (
    <Input
      name={name}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onMouseDown={onInputMouseDown}
      placeholder={label}
      ref={inputRef}
      type="text"
      value={inputValue}
    />
  );
}) as MaskedInput.Component;

export { MaskedInput };

MaskedInput.displayName = 'ReactInputsMaskedInput';
