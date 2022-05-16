import React, { ChangeEvent, useState } from 'react';
import { TextFieldProps } from '../types/text-field';

TextField.defaultProps = {
  value: ''
};

export default function TextField (props: TextFieldProps & typeof TextField.defaultProps) {
  const [value, setValue] = useState(props.value);

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
