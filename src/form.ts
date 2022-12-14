import { useReducer } from 'react';

import { Some } from './utility-types';

/**
 * Returns form data and a reducer action to update data key
 *
 * ```
 * const [data, setData] = useForm({
 *   name: 'John',
 *   surname: 'Doe'
 * });
 *
 * return (
 *   <TextField value={data.name} onChange={setData}/>
 * );
 * ```
 */
export function useForm<Data extends Form.AbstractData> (initialData: Data) {
  return useReducer<typeof formDataReducer<Data>>(formDataReducer, initialData);
}

/**
 * Form data reducer
 *
 * @param state
 * @param payload
 */
function formDataReducer<Data extends Form.AbstractData> (state: Data, payload: Some<Data>) {
  const payloadHasNewData = Object
    .entries(payload)
    .some(([key, value]) => state[key] !== value);

  return payloadHasNewData
    ? { ...state, ...payload }
    : state;
}

namespace Form {
  /**
   * Abstract form data interface
   */
  export type AbstractData = Record<string, unknown>;

  /**
   * Base field props interface
   */
  export interface FieldProps<Name extends string> {
    label?: string;
    name: Name;
  }

  /**
   * Field change event handler
   */
  export interface FieldChangeEvent<Name extends string, Value = unknown> {
    (data: Record<Name, Value>): void;
  }
}

export default Form;
