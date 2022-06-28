import React, { useCallback } from 'react';
import { NumberFieldInputProps, NumberFieldProps } from '../types/number-field';
import { FormData } from '../types/form';

/**
 * NumberField component
 * @param rawProps
 */
function NumberField<Key extends keyof FormData> (rawProps: NumberFieldProps<Key>) {
  const props = rawProps as typeof rawProps & typeof NumberField.defaultProps;
  const value = parseInteger(props.value);

  const onChange = useCallback<NumberFieldInputProps['onChange']>(
    ({ target }) => {
      const value = parseInteger(target.value);
      // @TODO реализовать на уровне валидации, т.к. при таком решении невозможно стирать некоторые значения
      /*if (
        (props.min !== undefined ? value >= props.min : true) &&
        (props.max !== undefined ? value <= props.max : true)
      )*/
      if (props.onChange !== undefined && !isNaN(value) && isCorrect(value))
        props.onChange(props.name, value);
    },
    [props.onChange, props.name]
  );

  return (
    <props.inputComponent
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

NumberField.defaultProps = {
  value: 0,
  inputComponent: (props: NumberFieldInputProps) => <input {...props}/>
};

/**
 * Transform raw value to integer
 * @param entry
 */
const parseInteger = (entry: string | number) => {
  if (entry === undefined)
    return 0;

  const [, digit, symbol] = [...entry.toString().matchAll(/(\d*)([-|+])$/g)][0] || [entry, entry, ''];

  return Number(digit ? `${symbol}${digit}` : '');
};

/**
 * Check value length
 * @param value
 */
const isCorrect = (value: number) => {
  return value.toString().replace('.', '').length <= 15;
};

export default NumberField;
