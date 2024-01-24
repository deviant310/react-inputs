import { ChangeEvent, useCallback, useMemo } from 'react';

export const useTextInput: TextInput.Hook = props => {
  const { setValue, value } = props;
  const inputValue = value;

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value),
    [setValue],
  );

  return useMemo(
    () => ({ inputValue, onInputChange }),
    [inputValue, onInputChange],
  );
};
