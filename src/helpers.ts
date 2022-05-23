import { Dispatch, SetStateAction } from 'react';

export function mapStateToObj<T, P extends readonly string[]> (state: [T, Dispatch<SetStateAction<T>>], mapNames: P) {
  type Obj = {
    [K in Exclude<Partial<typeof state>['length'], typeof state['length']> as typeof mapNames[K]]: typeof state[K]
  }

  return state
    .reduce((obj, value, index) => {
      obj[mapNames[index]] = value;

      return obj;
    }, {} as Record<string, unknown>) as Obj;
}
