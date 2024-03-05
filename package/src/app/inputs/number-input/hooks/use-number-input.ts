import { ChangeEvent, useCallback, useMemo } from 'react';

import { NumberInput } from '../../../types/number-input';

import { numberHasAppropriateLength, parseInteger } from '../helpers';

export const useNumberInput: NumberInput.Hook = props => {
  const { setValue, value } = props;
  const inputValue = value;

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInteger(target.value);

      if (!isNaN(value) && numberHasAppropriateLength(value))
        setValue(value);
    },
    [setValue],
  );

  return useMemo(
    () => ({ inputValue, onInputChange }),
    [inputValue, onInputChange],
  );
};
