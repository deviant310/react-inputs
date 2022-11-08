/**
 * @group Docker
 * [[include:docker.md]]
 */
import { useReducer } from 'react';

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
export function useForm<Data extends AbstractData = AbstractData> (initialData: Data) {
  return useReducer<typeof formDataReducer<Data>>(formDataReducer, initialData);
}

/**
 * Form data reducer
 *
 * @param state
 * @param payload
 */
function formDataReducer<Data extends AbstractData = AbstractData> (state: Data, payload: Payload<Data>) {
  const payloadHasNewData = Object.entries(payload)
    .some(([key, value]) => state[key] !== value);

  return payloadHasNewData ? { ...state, ...payload } : state;
}

/**
 * Abstract form data interface
 */
export type AbstractData = Record<string, unknown>;

/**
 * Payload interface for updating specific form data properties
 */
type Payload<Data extends AbstractData> = Exclude<{
  [K in keyof Data]: Pick<Data, K>;
}[keyof Data], undefined>;

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
