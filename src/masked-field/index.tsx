import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import type { Field } from '../field';

import { Input as DefaultInput } from './components';

import { MaskedValue } from './masked-value';

/**
 * A component for helping the user entering some text by configured mask.
 *
 * Input pattern is determined by {@link MaskedField.Props.mask} parameter.
 * The user's text input is controlled by {@link MaskedField.Props.source} parameter.
 */
export const MaskedField = memo(props => {
  type Name = typeof name;

  type Value = typeof dirtyValue;

  const {
    inputComponent: Input = DefaultInput,
    label,
    mask: definition,
    name,
    setValue,
    setValueFromRecord,
    source,
    stub = '_',
    value: dirtyValue,
  } = props;

  const maskedValue = useMemo(
    () => new MaskedValue({ definition, dirtyValue, source, stub }),
    [definition, dirtyValue, source, stub]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const setDataOrValue = useCallback(
    (value: Value) => {
      if (setValueFromRecord === true)
        setValue({ [name]: value } as Record<Name, Value> & Value);
      else
        setValue(value as Record<Name, Value> & Value);
    },
    [name, setValue, setValueFromRecord]
  );

  const restoreCaretPositionFrom = useCallback(
    (position: number, lazy?: boolean) => {
      if (inputRef.current === null) return;

      const caretPosition = maskedValue.getRelevantCaretPositionClosestTo(position, lazy);

      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    },
    [maskedValue]
  );

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { selectionEnd } = event.currentTarget;

      if (selectionEnd === null) return;

      switch (true) {
        case event.code === 'ArrowLeft': {
          event.preventDefault();

          return restoreCaretPositionFrom(selectionEnd - 1, true);
        }

        case event.code === 'ArrowRight': {
          event.preventDefault();

          return restoreCaretPositionFrom(selectionEnd + 1);
        }

        case event.code === 'ArrowUp': {
          event.preventDefault();

          return restoreCaretPositionFrom(maskedValue.firstEntryOffset);
        }

        case event.code === 'ArrowDown': {
          event.preventDefault();

          return restoreCaretPositionFrom(maskedValue.lastEntryOffset + 1);
        }
      }
    },
    [maskedValue, restoreCaretPositionFrom]
  );

  const onInputChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { selectionEnd, value: dirtyValue } = currentTarget;

      if (selectionEnd === null) return;

      const newMaskedValue = maskedValue.copyWith({ dirtyValue });

      setDataOrValue(newMaskedValue.payload as Value);

      requestAnimationFrame(() => {
        const caretPosition = newMaskedValue.getRelevantCaretPositionClosestTo(
          selectionEnd,
          newMaskedValue.payload.length < maskedValue.payload.length
        );

        currentTarget.setSelectionRange(caretPosition, caretPosition);
      });
    },
    [maskedValue, setDataOrValue]
  );

  const onInputMouseDown = useCallback(
    ({ currentTarget }: MouseEvent<HTMLInputElement>) => {
      requestAnimationFrame(() => {
        if (currentTarget.selectionEnd !== null)
          restoreCaretPositionFrom(currentTarget.selectionEnd, true);
      });
    },
    [restoreCaretPositionFrom]
  );

  useEffect(
    () => restoreCaretPositionFrom(definition.length, false),
    [definition.length, restoreCaretPositionFrom]
  );

  useEffect(
    () => {
      if (dirtyValue !== maskedValue.payload)
        setDataOrValue(maskedValue.payload as Value);
    },
    [dirtyValue, maskedValue, setDataOrValue]
  );

  return (
    <Input
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onMouseDown={onInputMouseDown}
      placeholder={label}
      ref={inputRef}
      type="text"
      value={maskedValue.text}
    />
  );
}) as MaskedField.Component;

export namespace MaskedField {
  export interface Component {
    <
      Name extends string,
      Value extends string,
      SetValueFromRecord extends boolean = false
    >
    (props: Props<Name, Value, SetValueFromRecord>): JSX.Element;
  }

  export interface Props<
    Name extends string,
    Value extends string,
    SetValueFromRecord extends boolean = false
  > extends Field.Props<Name, Value, SetValueFromRecord> {
    inputComponent?: InputComponent;
    mask: string;
    source: string;
    stub?: string;
  }

  export type InputComponent = DefaultInput.Component;
}
