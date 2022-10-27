import {
  ChangeEvent,
  FunctionComponent,
  memo,
  useCallback,
} from 'react';

import Form from '../types/form';

/**
 * NumberField component
 * @param props
 */
function NumberFieldFC<Name extends string, Value extends number> (props: NumberField.Props<Name, Value>) {
  const {
    value,
    inputComponent: Input,
    name,
    label,
    onChange
  } = props as typeof props & typeof NumberFieldFC.defaultProps;

  const setValue = useCallback(
    (value: Value) => onChange?.({ [name]: value }),
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInteger(target.value) as Value;

      if (!isNaN(value) && numberHasAppropriateLength(value))
        setValue(value);
    },
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
}

NumberFieldFC.defaultProps = {
  value: 0,
  inputComponent: (props: NumberField.InputProps) => <input {...props}/>
};

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

/**
 * NumberField memo component
 */
const NumberField = memo(NumberFieldFC) as unknown as typeof NumberFieldFC;

namespace NumberField {
  export interface Props<Name extends string, Value extends number> extends Form.FieldProps<Name> {
    value?: Value;
    inputComponent?: FunctionComponent<InputProps>;
    max?: number;
    min?: number;
    onChange?: (data: Form.Data<Name, Value>) => void;
  }

  export type InputProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: 'text';
    value: number;
  }
}

export default NumberField;
