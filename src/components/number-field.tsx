import React, { ChangeEvent, useCallback } from 'react';
import { NumberFieldInputProps, NumberFieldProps } from '../types/number-field';
import { useForm } from '../store';

/**
 * Polyfill for parsing raw value to integer
 * @param entry
 */
const parseInteger = (entry: string | number) => {
  if(entry === undefined)
    return 0;

  const [, digit, symbol] = [...entry.toString().matchAll(/(\d*)([-|+])$/g)][0] || [entry, entry, ''];

  return Number(digit ? `${symbol}${digit}` : '');
};

/**
 * NumberField component
 * @param props
 */
function NumberField (props: NumberFieldProps) {
  const finalProps = props as typeof props & typeof NumberField.defaultProps;
  const { formData, setFormProperty } = useForm<number>() ?? {};
  const value = parseInteger(formData?.[finalProps.name] ?? NumberField.defaultProps.value);

  type Value = typeof value;

  const setValue = useCallback((value: Value) => {
    setFormProperty !== undefined && setFormProperty(finalProps.name, value);
  }, [setFormProperty]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInteger(e.target.value);
    // @TODO реализовать на уровне валидации, т.к. при таком решении невозможно стирать некоторые значения
    /*if (
      (props.min !== undefined ? value >= props.min : true) &&
      (props.max !== undefined ? value <= props.max : true)
    )*/
    if(!isNaN(value) && value.toString().replace('.', '').length <= 15)
      setValue(value);
  }, [setValue]);

  const numberFieldElement = (
    <finalProps.inputComponent
      type="text"
      value={value}
      onChange={onChange}
    />
  );

  return (
    finalProps.wrapperComponent ? (
      <finalProps.wrapperComponent>
        {numberFieldElement}
      </finalProps.wrapperComponent>
    ) : (
      numberFieldElement
    )
  );
}

NumberField.defaultProps = {
  value: 0,
  inputComponent: (props: NumberFieldInputProps) => <input {...props}/>
};

export default NumberField;
