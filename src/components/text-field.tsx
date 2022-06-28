import React, { useCallback } from 'react';
import { TextFieldInputProps, TextFieldProps } from '../types/text-field';
import { FormData } from '../types/form';

/**
 * TextField component
 * @param rawProps
 */
function TextField<Key extends keyof FormData> (rawProps: TextFieldProps<Key>) {
  const props = rawProps as typeof rawProps & typeof TextField.defaultProps;

  const onChange = useCallback<TextFieldInputProps['onChange']>(
    ({ target }) => {
      if (props.onChange !== undefined)
        props.onChange(props.name, target.value);
    },
    [props.onChange, props.name]
  );

  return (
    <props.inputComponent
      type="text"
      value={props.value}
      onChange={onChange}
    />
  );
}

TextField.defaultProps = {
  value: '',
  inputComponent: (props: TextFieldInputProps) => <input {...props}/>
};

export default TextField;
