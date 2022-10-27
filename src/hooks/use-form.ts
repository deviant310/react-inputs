import { useReducer } from 'react';

import Form from '../types/form';

/**
 * Returns form data and a reducer action to update data key
 *
 * @example
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
 *
 * @param initialData
 */
function useForm<Data extends Form.Data> (initialData: Data) {
  return useReducer<(state: Data, payload: Form.Payload<Data>) => Data>(formDataReducer, initialData);
}

function formDataReducer <Data extends Form.Data> (state: Data, payload: Form.Payload<Data>) {
  const payloadHasNewData = Object.entries(payload)
    .some(([key, value]) => state[key] !== value);

  return payloadHasNewData ? { ...state, ...payload } : state;
}

export default useForm;
