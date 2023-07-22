import { FocusEvent, FunctionComponent, PropsWithChildren } from 'react';

export const Container: Container.Component = props => (
  <div {...props} />
);

export namespace Container {
  export type Component = FunctionComponent<Props>;

  export type Props = PropsWithChildren<{
    onBlur (e: FocusEvent<HTMLInputElement>): void;
    role: 'group';
    tabIndex: number;
  }>
}
