import { ChangeEvent, FunctionComponent } from 'react';

export const Input: Input.Component = props => (
  <input {...props} />
);

export namespace Input {
  export type Component = FunctionComponent<Props>;

  export type Props = {
    name: string;
    onChange (event: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}
