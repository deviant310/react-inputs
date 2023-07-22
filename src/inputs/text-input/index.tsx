import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import type { CompoundInputProps } from '../../factory/compound-input';

import { Input as DefaultInput } from './components';

/**
 * Text input component
 */
const TextInput = memo(props => {
  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    setValue,
    value,
  } = props;

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value),
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
}) as TextInput.Component;

TextInput.displayName = 'ReactTextInput';

namespace TextInput {
  export interface Component extends Omit<FunctionComponent<Props<string, string>>, number> {
    <Name extends string, Value extends string> (props: Props<Name, Value>): JSX.Element;
  }

  export type Props<Name extends string, Value extends string> = CompoundInputProps<Name, Value> & {
    inputComponent?: InputComponent;
  }

  export type InputComponent = DefaultInput.Component;

  export type InputProps = DefaultInput.Props
}

export default TextInput;
