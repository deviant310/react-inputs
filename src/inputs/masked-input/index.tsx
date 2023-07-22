import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  memo,
  useCallback,
  useEffect, useRef, useState,
} from 'react';

import type { CompoundInputProps } from '../../factory/compound-input';

import { Input as DefaultInput } from './components';

import Mask from './mask';

/**
 * A component for helping the user entering some text by configured mask.
 *
 * Input pattern is determined by {@link MaskedInput.Props.mask} parameter.
 * The user's text input is controlled by {@link MaskedInput.Props.source} parameter.
 */
const MaskedInput = memo(props => {
  const {
    definitions,
    inputComponent: Input = DefaultInput,
    label,
    mask: pattern,
    name,
    setValue,
    stub = '_',
    value: dirtyValue,
  } = props;

  const mask = useRef(
    new Mask({ definitions, dirtyValue, pattern, stub }),
  );

  const [maskedValue, setMaskedValue] = useState(mask.current.text);
  const lastEditingValue = useRef(maskedValue);
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
        newMask.startOffset === 0 ||
        caretPosition >= newMask.startOffset ||
        caretPosition === 1 ||
        newMask.entriesContainsDefinedValues
          ? [newMask.text, newMask.payload]
          : ['', '']
      );

      setValue(unmaskedValue);

      setMaskedValue(maskedValue);

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

        setMaskedValue(mask.current.text);
      }
    },
    [definitions, dirtyValue, pattern, setValue, stub],
  );

  return (
    <Input
      name={name}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onMouseDown={onInputMouseDown}
      placeholder={label}
      ref={inputRef}
      type="text"
      value={maskedValue}
    />
  );
}) as MaskedInput.Component;

MaskedInput.displayName = 'ReactMaskedInput';

namespace MaskedInput {
  export interface Component extends Omit<FunctionComponent<Props<string, string>>, number> {
    <Name extends string, Value extends string> (props: Props<Name, Value>): ReactElement;
  }

  export type Props<Name extends string, Value extends string> = CompoundInputProps<Name, Value> & {
    definitions?: Record<string, RegExp>;
    inputComponent?: InputComponent;
    mask: string;
    stub?: string;
  }

  export type InputComponent = DefaultInput.Component;
}

export default MaskedInput;
