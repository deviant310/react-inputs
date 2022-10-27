import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import Form from '../types/form';

/**
 * TextField component
 * @param props
 */
function TextFieldFC<Name extends string, Value extends string> (props: TextField.Props<Name, Value>) {
  const {
    value,
    inputComponent: Input,
    name,
    label,
    onChange,
  } = props as typeof props & typeof TextFieldFC.defaultProps;

  const setValue = useCallback(
    (value: Value) => onChange?.({ [name]: value }),
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value as Value),
    [setValue]
  );

  return (
    <Input
      type="text"
      value={value}
      placeholder={label}
      onChange={onInputChange}
    />
  );
}

TextFieldFC.defaultProps = {
  value: '',
  inputComponent: (props: TextField.InputProps) => <input {...props}/>
};

/**
 * TextField memo component
 */
const TextField = memo(TextFieldFC) as unknown as typeof TextFieldFC;

namespace TextField {
  export interface Props<Name extends string, Value extends string> extends Form.FieldProps<Name> {
    value?: Value;
    inputComponent?: FunctionComponent<InputProps>;
    onChange?: (data: Form.Data<Name, Value>) => void;
  }

  export interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}

export default TextField;
