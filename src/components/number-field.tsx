import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { NumberFieldInputProps, NumberFieldProps } from '../types/number-field';
import { FormContext } from '../store';
import { mapStateToObj } from '../helpers';
import { FormData as Data } from '../types/form';

/**
 * Polyfill for parsing raw value to integer
 * @param entry
 */
const parseInteger = (entry: string | number) => {
  const [, digit, symbol] = [...entry.toString().matchAll(/(\d*)([-|+])$/g)][0] || [entry, entry, ''];

  const integer = Number(digit ? `${symbol}${digit}` : '');

  return !isNaN(integer) ? integer : 0;
};

/**
 * Default input component
 * @param props
 */
const Input = (props: NumberFieldInputProps) => <input {...props}/>;

/**
 * NumberField component
 * @param props
 */
function NumberField (props: NumberFieldProps & typeof NumberField.defaultProps) {
  const { formData: data, setFormData: setData } = useContext(FormContext)
  || mapStateToObj(useState({} as Data), ['formData', 'setFormData'] as const);

  const value = parseInteger(
    data[props.name] !== undefined
      ? data[props.name] as number
      : props.value
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInteger(e.target.value);

    /*if (
      (props.min !== undefined ? value >= props.min : true) &&
      (props.max !== undefined ? value <= props.max : true)
    )*/
    setData({ ...data, [props.name]: value });
  }, [data]);

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
  inputComponent: Input
};

export default NumberField;
