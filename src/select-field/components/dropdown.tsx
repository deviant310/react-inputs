import { FunctionComponent, PropsWithChildren } from 'react';

export const Dropdown: Dropdown.Component = props => (
  <div {...props} />
);

export namespace Dropdown {
  export type Component = FunctionComponent<Props>;

  export type Props = PropsWithChildren<{
    role: 'dialog';
  }>
}
