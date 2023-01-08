import { FunctionComponent, MouseEvent, useCallback } from 'react';

export const Option: Option.Component = props => {
  const {
    component: Component,
    data,
    onSelect
  } = props;

  const onClick = useCallback(
    () => onSelect(data),
    [data, onSelect]
  );

  return (
    <Component
      data={data}
      onClick={onClick}
      role="option"
    />
  );
};

export namespace Option {
  export interface Component {
    <Data>(props: Props<Data>): JSX.Element;
  }

  export interface Props<Data> {
    component: FunctionComponent<ComponentProps<Data>>;
    data: Data;
    onSelect (data: Data): void;
  }

  export interface ComponentProps<Data> {
    data: Data;
    onClick (event: MouseEvent<HTMLInputElement>): void;
    role: 'option';
  }
}
