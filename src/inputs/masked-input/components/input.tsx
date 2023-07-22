import {
  ChangeEvent,
  ForwardRefExoticComponent,
  KeyboardEvent,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
} from 'react';

const Input: Input.Component = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

namespace Input {
  export type Component = ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<HTMLInputElement>>;

  export type Props = {
    name: string;
    onChange (e: ChangeEvent<HTMLInputElement>): void;
    onKeyDown (e: KeyboardEvent<HTMLInputElement>): void;
    onMouseDown (e: MouseEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}

export default Input;
