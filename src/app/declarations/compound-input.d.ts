import { Dispatch } from 'react';

/**
 * Compound input hook props interface
 */
export  interface CompoundInputHookProps<Value> {
  setValue: Dispatch<Value>;
  value: Value;
}

/**
 * Compound input props interface
 */
export interface CompoundInputProps<Name extends string, Value> extends CompoundInputHookProps<Value> {
  label?: string;
  name?: Name;
}
