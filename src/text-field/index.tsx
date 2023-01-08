import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import type { Field } from '../field';

/**
 * Text field component
 */
export const TextField = memo(props => {
  type Name = typeof name;

  type Value = typeof value;

  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    setValue,
    setValueFromRecord,
    value,
  } = props;

  const setDataOrValue = useCallback(
    (value: Value) => {
      if (setValueFromRecord === true)
        setValue({ [name]: value } as Record<Name, Value> & Value);
      else
        setValue(value as Record<Name, Value> & Value);
    },
    [name, setValue, setValueFromRecord]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setDataOrValue(target.value as Value),
    [setDataOrValue]
  );

  return (
    <Input
      onChange={onInputChange}
      placeholder={label}
      type="text"
      value={value}
    />
  );
}) as TextField.Component;

// TODO: вынести в components
const DefaultInput = (props: TextField.InputProps) => <input {...props} />;

export namespace TextField {
  export interface Component {
    <
      Name extends string,
      Value extends string,
      SetValueFromRecord extends boolean = false
    >
    (props: Props<Name, Value, SetValueFromRecord>): JSX.Element;
  }

  export interface Props<
    Name extends string,
    Value extends string,
    SetValueFromRecord extends boolean = false
  > extends Field.Props<Name, Value, SetValueFromRecord> {
    inputComponent?: FunctionComponent<InputProps>;
  }

  export type InputProps = {
    onChange (e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}
