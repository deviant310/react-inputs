import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import type { CompoundInputProps } from '../../factory/compound-input';

import { Input as DefaultInput } from './components';

import { numberHasAppropriateLength, parseInteger } from './helpers';

/**
 * Number field component
 */
const NumberInput = memo(props => {
  const {
    inputComponent: Input = DefaultInput,
    label,
    max,
    min,
    name,
    setValue,
    value,
  } = props;

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInteger(target.value);

      if (!isNaN(value) && numberHasAppropriateLength(value))
        setValue(value);
    },
    [setValue],
  );

  return (
    <Input
      name={name}
      onChange={onInputChange}
      placeholder={label}
      type="text"
      value={value}
    />
  );
}) as NumberInput.Component;

NumberInput.displayName = 'ReactNumberInput';

namespace NumberInput {
  export interface Component extends Omit<FunctionComponent<Props<string, number>>, number> {
    <Name extends string, Value extends number> (props: Props<Name, Value>): JSX.Element;
  }

  export type Props<Name extends string, Value extends number> = CompoundInputProps<Name, Value> & {
    inputComponent?: InputComponent;
    max?: number;
    min?: number;
  }

  export type InputComponent = DefaultInput.Component;

  export type InputProps = DefaultInput.Props;
}

export default NumberInput;
