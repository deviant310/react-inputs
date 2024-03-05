import { ChangeEvent, KeyboardEvent ,MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MaskedInput } from '../../../types/masked-input';

import { Mask } from '../mask';

export const useMaskedInput: MaskedInput.Hook = props => {
  const {
    definitions,
    mask: pattern,
    setValue,
    stub = '_',
    value: dirtyValue,
  } = props;

  const mask = useRef(
    new Mask({ definitions, dirtyValue, pattern, stub }),
  );

  const [inputValue, setInputValue] = useState(mask.current.text);
  const lastEditingValue = useRef(inputValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const restoreCaretPositionFrom = useCallback(
    (position: number, lazy?: boolean) => {
      const caretPosition = mask.current.getRelevantCaretPositionClosestTo(position, lazy);

      inputRef.current?.setSelectionRange(caretPosition, caretPosition);
    },
    [],
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

          return restoreCaretPositionFrom(mask.current.firstEntryOffset);
        }

        case event.code === 'ArrowDown': {
          event.preventDefault();

          return restoreCaretPositionFrom(mask.current.lastEntryOffset + 1);
        }
      }
    },
    [mask, restoreCaretPositionFrom],
  );

  const onInputChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { selectionEnd, value: dirtyValue } = currentTarget;

      if (selectionEnd === null) return;

      const caretPosition = selectionEnd;
      const diffCount = dirtyValue.length - lastEditingValue.current.length;
      const newMask = mask.current.copyWith({ dirtyValue });

      const [maskedValue, unmaskedValue] = (
        newMask.startOffset === 0
        || caretPosition >= newMask.startOffset
        || caretPosition === 1
        || newMask.entriesContainsDefinedValues
          ? [newMask.text, newMask.payload]
          : ['', '']
      );

      setValue(unmaskedValue);

      setInputValue(maskedValue);

      requestAnimationFrame(() => {
        restoreCaretPositionFrom(
          caretPosition < mask.current.startOffset
            ? mask.current.startOffset + diffCount
            : caretPosition,
          diffCount < 0,
        );
      });

      mask.current = newMask;

      lastEditingValue.current = maskedValue;
    },
    [restoreCaretPositionFrom, setValue],
  );

  const onInputMouseDown = useCallback(
    ({ currentTarget }: MouseEvent<HTMLInputElement>) => {
      requestAnimationFrame(() => {
        if (currentTarget.selectionEnd !== null)
          restoreCaretPositionFrom(currentTarget.selectionEnd);
      });
    },
    [restoreCaretPositionFrom],
  );

  useEffect(
    () => restoreCaretPositionFrom(
      typeof mask.current.lastEntryOffset === 'number'
        ? mask.current.lastEntryOffset + 1
        : mask.current.startOffset,
    ),
    [restoreCaretPositionFrom],
  );

  useEffect(
    () => {
      const { props } = mask.current;

      if (
        definitions !== props.definitions ||
        pattern !== props.pattern ||
        stub !== props.stub
      ) {
        mask.current = new Mask({ definitions, dirtyValue, pattern, stub });

        setValue(mask.current.payload);

        setInputValue(mask.current.text);
      }
    },
    [definitions, dirtyValue, pattern, setValue, stub],
  );

  return useMemo(
    () => ({
      inputRef,
      inputValue,
      onInputChange,
      onInputKeyDown,
      onInputMouseDown,
    }),
    [
      inputRef,
      inputValue,
      onInputChange,
      onInputKeyDown,
      onInputMouseDown,
    ],
  );
};
