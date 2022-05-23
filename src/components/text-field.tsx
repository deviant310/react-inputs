import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { TextFieldInputProps, TextFieldProps } from '../types/text-field';
import { FormContext } from '../store';
import { mapStateToObj } from '../helpers';
import { FormData } from '../types/form';

const Input = (props: TextFieldInputProps) => <input {...props}/>;

function TextField (props: TextFieldProps & typeof TextField.defaultProps) {
  const { formData, setFormData } = useContext(FormContext)
  || mapStateToObj(useState({} as FormData), ['formData', 'setFormData'] as const);
  const value = formData[props.name] !== undefined ? formData[props.name] as string : props.value;

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [props.name]: e.target.value });
  }, [formData]);

  return (
    <props.inputComponent
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

TextField.defaultProps = {
  value: '',
  inputComponent: Input
};

export default TextField;
