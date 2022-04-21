import React, { ChangeEvent, CSSProperties, useState } from 'react';
import { AutocompleteFieldProps } from '../types/AutocompleteField';

AutocompleteField.defaultProps = {
  value: '',
  isAffected: false
} as AutocompleteFieldProps;

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    width: '100%'
  }
};

export default function AutocompleteField (props: AutocompleteFieldProps & typeof AutocompleteField.defaultProps) {
  const [state, setState] = useState(AutocompleteField.defaultProps);

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      {value.length > 0 && (
        <div style={styles.dropdown}>
          <div>one</div>
          <div>two</div>
        </div>
      )}
    </div>
  );
}
