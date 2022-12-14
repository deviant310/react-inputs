import { ChangeEvent, FunctionComponent, memo, useCallback } from 'react';

import Form from '../../form';

/**
 * Number field component
 */
export const NumberField = memo(props => {
  type Name = typeof name;

  const {
    inputComponent: Input = DefaultInput,
    label,
    name,
    onChange,
    value = 0
  } = props;

  const setFieldData = useCallback(
    (value: number) => onChange?.({ [name]: value } as Record<Name, number>),
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInteger(target.value);

      if (!isNaN(value) && numberHasAppropriateLength(value))
        setFieldData(value);
    },
    [setFieldData]
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

/**
 * Check value length
 * @param value
 */
function numberHasAppropriateLength (value: number) {
  return value.toString().replace('.', '').length <= 15;
}

export namespace NumberField {
  export interface Component {
    <Name extends string>(props: Props<Name>): JSX.Element;
  }

  export interface Props<Name extends string> extends Form.FieldProps<Name> {
    inputComponent?: FunctionComponent<InputProps>;
    max?: number;
    min?: number;
    onChange?: Form.FieldChangeEvent<Name, number>;
    value?: number;
  }

  export type InputProps = {
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: number;
  }
}
