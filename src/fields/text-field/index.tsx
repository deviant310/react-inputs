import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import Form from '../../form';

/**
 * Text field component
 */
export const TextField = memo(props => {
  type Name = typeof name;

  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    onChange,
    value = '',
  } = props;

  const setValue = useCallback(
    (value: string) => onChange?.({ [name]: value } as Record<Name, string>),
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value),
    [setValue]
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

const DefaultInput = (props: TextField.InputProps) => <input {...props} />;

export namespace TextField {
  export type Component = <Name extends string>(props: Props<Name>) => JSX.Element;

  export interface Props<Name extends string> extends Form.FieldProps<Name> {
    inputComponent?: FunctionComponent<InputProps>;
    onChange?: Form.FieldChangeEvent<Name, string>;
    value?: string;
  }

  export interface InputProps {
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}
