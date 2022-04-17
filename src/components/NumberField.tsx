import React, { ChangeEvent, useState } from 'react';
import { NumberField as NumberFieldProps } from '../types/NumberField';

NumberField.defaultProps = {
  value: 0
};

export default function NumberField (props: NumberFieldProps & typeof NumberField.defaultProps) {
  const { min, max } = props;
  const [value, setValue] = useState(props.value);

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    const value = parseIntegerFromString(e.target.value);

    if (!isNaN(value))
      if (
        (min !== undefined ? value >= min : true) &&
        (max !== undefined ? value <= max : true)
      ) setValue(value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

function parseIntegerFromString (string: string) {
  const [, number, symbol] = [...string.matchAll(/(\d*)([-|+])$/g)][0] || [string, string, ''];

  return Number(number ? `${symbol}${number}` : '');
}
