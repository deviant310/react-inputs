import { Dispatch } from 'react';

/**
 * Compound input props interface
 */
export interface CompoundInputProps<Name extends string, Value> {
  label?: string;
  name: Name;
  setValue: Dispatch<Value>;
  value: Value;
}
