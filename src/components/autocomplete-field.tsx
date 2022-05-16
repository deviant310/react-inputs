import React, { ChangeEvent, CSSProperties, useState } from 'react';
import { AutocompleteFieldProps } from '../types/autocomplete-field';

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    position: 'relative'
  },
  input: {
    width: '100%'
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
  }
};

AutocompleteField.defaultProps = {
  value: '',
  dropdownIsVisible: false,
};

export default function AutocompleteField (props: AutocompleteFieldProps & typeof AutocompleteField.defaultProps) {
  const [state, setState] = useState({
    value: props.value,
    dropdownIsVisible: props.dropdownIsVisible,
  });
  const options = props.optionsBuilder(state.value);

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    setState({
      value: e.target.value,
      dropdownIsVisible: Boolean(e.target.value.length),
    });
  }

  return (
    <div style={{ ...props.wrapperStyles, ...styles.wrapper }}>
      <input
        type="text"
        value={state.value}
        onChange={onChange}
        style={{ ...props.inputStyles, ...styles.input }}
      />
      {state.dropdownIsVisible && options.length > 0 && (
        <div style={{ ...props.dropdownStyles, ...styles.dropdown }}>
          {options.map(props.renderOption)}
        </div>
      )}
    </div>
  );
}
