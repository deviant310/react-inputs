import {
  ChangeEvent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  forwardRef
} from 'react';

export const Input: Input.Component = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

export namespace Input {
  export type Component = ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<HTMLInputElement>>;

  export type Props = {
    onChange (event: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }
}
