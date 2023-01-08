import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import type { Field } from '../field';

/**
 * Number field component
 */
export const NumberField = memo(props => {
  type Name = typeof name;

  type Value = typeof value;

  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    setValue,
    setValueFromRecord,
    value
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
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInteger(target.value);

      if (!isNaN(value) && numberHasAppropriateLength(value))
        setDataOrValue(value as Value);
    },
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
}) as NumberField.Component;

// TODO: вынести в components
const DefaultInput = (props: NumberField.InputProps) => <input {...props} />;

/**
 * Transform raw value to integer
 * @param entry
 */
function parseInteger (entry: string | number) {
  if (entry === undefined)
    return 0;

  const [, digit, symbol] = [...entry.toString().matchAll(/(\d*)([-|+])$/g)][0] || [entry, entry, ''];

  return Number(digit ? `${symbol}${digit}` : '');
}

// TODO: вынести в helpers
/**
 * Check value length
 * @param value
 */
function numberHasAppropriateLength (value: number) {
  return value.toString().replace('.', '').length <= 15;
}

export namespace NumberField {
  export interface Component {
    <
      Name extends string,
      Value extends number,
      SetValueFromRecord extends boolean = false
    >
    (props: Props<Name, Value, SetValueFromRecord>): JSX.Element;
  }

  export interface Props<
    Name extends string,
    Value extends number,
    SetValueFromRecord extends boolean = false
  > extends Field.Props<Name, Value, SetValueFromRecord> {
    inputComponent?: FunctionComponent<InputProps>;
    max?: number;
    min?: number;
  }

  export interface InputProps {
    onChange (e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: number;
  }
}
