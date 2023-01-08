import type { Dispatch } from 'react';

export namespace Field {
  /**
   * Base field props interface
   */
  export interface Props<Name extends string, Value, SetValueFromRecord extends boolean> {
    label?: string;
    name: Name;
    setValue: SetValueFromRecord extends true
      ? Dispatch<Record<Name, Value>>
      : Dispatch<Value>;
    setValueFromRecord?: SetValueFromRecord;
    value: Value;
  }
}
