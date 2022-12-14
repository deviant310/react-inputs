import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Input as DefaultInput, } from './components/input';

import MaskedValue from './masked-value';

import Form from '../../form';

type EditingInfo = {
  caretMovedBy: 'typing' | 'deleting';
  caretNativePosition: number;
}

/**
 * A component for helping the user entering some text by configured mask.
 *
 * Input pattern is determined by {@link MaskedField.Props.mask} parameter.
 * The user's text input is controlled by {@link MaskedField.Props.source} parameter.
 */
export const MaskedField = memo(props => {
  type Name = typeof name;

  const {
    inputComponent: Input = DefaultInput,
    label,
    mask: definition,
    name,
    onChange,
    source,
    stub = '_',
    value = '',
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const maskedValue = useRef(
    new MaskedValue({ definition, source, stub, value })
  );

  const [editingInfo, setEditingInfo] = useState<EditingInfo>({
    caretMovedBy: 'typing',
    caretNativePosition: definition.length,
  });

  const setValue = useCallback(
    (value: string) => {
      onChange?.({ [name]: value } as Record<Name, string>);
    },
    [onChange, name]
  );

  const restoreCaretPositionFrom = useCallback(
    (position: number, lazy?: boolean) => {
      if (inputRef.current === null) return;

      const caretPosition = maskedValue.current.getRelevantCaretPositionClosestTo(position, lazy);

      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    },
    []
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

          return restoreCaretPositionFrom(maskedValue.current.firstEntryOffset);
        }

        case event.code === 'ArrowDown': {
          event.preventDefault();

          return restoreCaretPositionFrom(maskedValue.current.lastEntryOffset + 1);
        }
      }
    },
    [restoreCaretPositionFrom]
  );

  const onInputChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { selectionEnd, value } = currentTarget;

      if (selectionEnd === null) return;

      const maskedValuePreviousPayload =  maskedValue.current.payload;

      maskedValue.current = maskedValue.current.copyWith({ value });

      setEditingInfo({
        caretMovedBy: maskedValue.current.payload.length < maskedValuePreviousPayload.length
          ? 'deleting'
          : 'typing',
        caretNativePosition: selectionEnd,
      });

      setValue(maskedValue.current.payload);
    },
    [setValue]
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
    () => {
      restoreCaretPositionFrom(
        editingInfo.caretNativePosition,
        editingInfo.caretMovedBy === 'deleting'
      );
    },
    [editingInfo, restoreCaretPositionFrom]
  );

  useEffect(
    () => {
      maskedValue.current = maskedValue.current.copyWith({ definition, source, stub });

      setValue(maskedValue.current.payload);
    },
    [definition, setValue, source, stub]
  );

  return (
    <Input
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onMouseDown={onInputMouseDown}
      placeholder={label}
      ref={inputRef}
      type="text"
      value={maskedValue.current.text}
    />
  );
}) as MaskedField.Component;

export namespace MaskedField {
  export type Component = <Name extends string> (props: Props<Name>) => JSX.Element;

  export type InputComponent = DefaultInput.Component;

  export interface Props<Name extends string> extends Form.FieldProps<Name> {
    inputComponent?: InputComponent;
    mask: string;
    onChange?: Form.FieldChangeEvent<Name, string>;
    source: string;
    stub?: string;
    value?: string;
  }
}
