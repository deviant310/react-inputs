import { memo } from 'react';

import { MaskedInputProps } from './types';

import { Input as DefaultInput } from './components';

import { useMaskedInput } from './hooks';

/**
 * A component for helping the user entering some text by configured mask.
 * Input pattern is determined by {@link MaskedInputProps.mask} parameter.
 *
 * @category Main component
 */
export const MaskedInput = memo(<Name extends string>(props: MaskedInputProps<Name>) => {
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
});

MaskedInput.displayName = 'ReactInputsMaskedInput';
