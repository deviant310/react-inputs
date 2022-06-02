import React, { ChangeEvent, useCallback } from 'react';
import { TextFieldInputProps, TextFieldProps } from '../types/text-field';
import { useForm } from '../store';

function TextField (props: TextFieldProps) {
  const finalProps = props as typeof props & typeof TextField.defaultProps;
  const { formData, setFormProperty } = useForm<string>() ?? {};
  const value = formData?.[finalProps.name] ?? TextField.defaultProps.value;

  type Value = typeof value;

  const setValue = useCallback((value: Value) => {
    setFormProperty !== undefined && setFormProperty(finalProps.name, value);
  }, [setFormProperty]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, [setValue]);

  const textFieldElement = (
    <finalProps.inputComponent
      type="text"
      value={value}
      onChange={onChange}
    />
  );

  return (
    finalProps.wrapperComponent ? (
      <finalProps.wrapperComponent>
        {textFieldElement}
      </finalProps.wrapperComponent>
    ) : (
      textFieldElement
    )
  );
}

TextField.defaultProps = {
  value: '',
  inputComponent: (props: TextFieldInputProps) => <input {...props}/>
};

export default TextField;
