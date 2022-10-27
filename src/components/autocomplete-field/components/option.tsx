import { FunctionComponent, MouseEvent, useCallback } from 'react';

/**
 * Autocomplete field option component
 * @param props
 */
function Option<Data> (props: Option.Props<Data>) {
  const { data, onSelect, optionComponent: OptionComponent } = props;

  const onClick = useCallback(
    () => onSelect?.(data),
    [onSelect, data]
  );

  return (
    <OptionComponent
      role="option"
      data={data}
      onClick={onClick}
    />
  );
}

namespace Option {
  export interface Props<Data> {
    data: Data;
    onSelect?: (data: Data) => void;
    optionComponent: FunctionComponent<ComponentProps<Data>>;
  }

  export interface ComponentProps<Data> {
    data: Data;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    role: 'option';
  }
}

export default Option;
