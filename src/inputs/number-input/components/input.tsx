import { ChangeEvent, FunctionComponent } from 'react';

const Input: Input.Component = props => (
  <input {...props} />
);

namespace Input {
  export type Component = FunctionComponent<Props>;

  export type Props = {
    name: string;
    onChange (e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: number;
  }
}

export default Input;
