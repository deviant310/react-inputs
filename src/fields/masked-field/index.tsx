import {
  ChangeEvent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { FieldChangeEvent, FieldProps } from '../../form';

const MASK_PATTERN_SYMBOL = '#';
const MASK_STUB_SYMBOL = '_';

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
    mask: maskString,
    name,
    onChange,
    source,
    stub = MASK_STUB_SYMBOL,
    value = '',
  } = props;

  const initialValue = useRef(value);
  const input = useRef<HTMLInputElement>(null);
  const componentIsReadyToResetDisplayValue = useRef(false);
  const [displayValue, setDisplayValue] = useState('');

  const getMaskFromRawText = useCallback(
    (rawText: string): MaskedField.Mask => {
      const capturedEntries = [...rawText.matchAll(RegExp(source, 'g'))]
        .map(match => match[1])
        .filter(Boolean);

      const startOffset = maskString.indexOf(MASK_PATTERN_SYMBOL);
      const entriesOffsets: number[] = [];

      let entryIndex = 0;

      const text = maskString.replace(
        RegExp(String.raw`${MASK_PATTERN_SYMBOL}`, 'g'),
        (match, offset) => {
          const entry = capturedEntries[entryIndex];

          entryIndex++;

          if (entry) {
            entriesOffsets.push(offset);

            return entry;
          } else {
            return stub;
          }
        }
      );

      const payload = [...text.matchAll(RegExp(source, 'g'))]
        .map(match => match[0])
        .join('');

      return { entriesOffsets, payload, startOffset, text };
    },
    [maskString, source, stub]
  );

  const setCaretPosition = useCallback(
    (position: number) => {
      input.current?.setSelectionRange(position, position);
    },
    []
  );

  const setFieldData = useCallback(
    (value: string, displayValue: string) => {
      setDisplayValue(displayValue);

      onChange?.({ [name]: value } as Record<Name, string>);
    },
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { selectionStart, value } = target;

      if (!selectionStart) return;

      const mask = getMaskFromRawText(value);
      const caretAt = getMaskRealCaretPositionByInitialCaretPosition(mask, selectionStart);

      setFieldData(mask.payload, mask.text);

      requestAnimationFrame(() => setCaretPosition(caretAt));
    },
    [getMaskFromRawText, setCaretPosition, setFieldData]
  );

  const onInputMouseDown = useCallback(
    (event: Event) => {
      requestAnimationFrame(() => {
        const target = event.target as HTMLInputElement;
        const { selectionStart } = target;

        if (selectionStart === null) return;

        const mask = getMaskFromRawText(value);
        const caretAt = getMaskRealCaretPositionByInitialCaretPosition(mask, selectionStart, true);

        setCaretPosition(caretAt);
      });
    },
    [getMaskFromRawText, setCaretPosition, value]
  );

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent) => {
      requestAnimationFrame(() => {
        const { code } = event;
        const target = event.target as HTMLInputElement;
        const { selectionStart, value } = target;

        if (selectionStart === null) return;

        const mask = getMaskFromRawText(value);
        const firstCharPosition = mask.entriesOffsets[0];
        const lastCharPosition = mask.entriesOffsets[mask.entriesOffsets.length - 1];

        switch (code) {
          case 'ArrowLeft': {
            const caretAt = getMaskRealCaretPositionByInitialCaretPosition(mask, selectionStart, true);

            return setCaretPosition(caretAt);
          }

          case 'ArrowRight': {
            const caretAt = getMaskRealCaretPositionByInitialCaretPosition(mask, selectionStart);

            return setCaretPosition(caretAt);
          }

          case 'ArrowUp':
            return setCaretPosition(firstCharPosition);

          case 'ArrowDown':
            return setCaretPosition(lastCharPosition + 1);
        }
      });
    },
    [getMaskFromRawText, setCaretPosition]
  );

  useEffect(
    () => {
      const mask = getMaskFromRawText(initialValue.current);

      setFieldData(mask.payload, mask.text);
    },
    [getMaskFromRawText, setFieldData]
  );

  useEffect(
    () => {
      const currentInput = input.current;

      currentInput?.addEventListener('mousedown', onInputMouseDown);

      currentInput?.addEventListener('keydown', onInputKeyDown);

      return () => {
        currentInput?.removeEventListener('mousedown', onInputMouseDown);

        currentInput?.removeEventListener('keydown', onInputKeyDown);
      };
    },
    [onInputChange, onInputMouseDown, onInputKeyDown]
  );

  useEffect(
    () => {
      if (componentIsReadyToResetDisplayValue.current) {
        const { text: maskedText } = getMaskFromRawText(value);

        if (displayValue !== maskedText) {
          setDisplayValue(maskedText);
        }
      } else {
        componentIsReadyToResetDisplayValue.current = true;
      }
    },
    [setCaretPosition, getMaskFromRawText, value, displayValue]
  );

  return (
    <Input
      onChange={onInputChange}
      placeholder={label}
      ref={input}
      type="text"
      value={displayValue}
    />
  );
}) as MaskedField.Component;

const DefaultInput = forwardRef<HTMLInputElement, MaskedField.InputProps>((props, ref) => (
  <input {...props} ref={ref}/>
));

/**
 * Getting mask real caret position by initial caret position
 * @param mask
 * @param initialCaretPosition
 * @param lazy
 */
function getMaskRealCaretPositionByInitialCaretPosition (
  mask: MaskedField.Mask,
  initialCaretPosition: number,
  lazy?: boolean
) {
  const { entriesOffsets, startOffset } = mask;
  const initialCharPosition = initialCaretPosition - 1;
  const whereOffsetGreaterThanPositionOrEqual = (offset: number) => offset >= initialCharPosition;
  const whereOffsetGreaterThanPosition = (offset: number) => offset > initialCharPosition;

  const closestCharPositionIndex = entriesOffsets
    .findIndex(
      lazy
        ? whereOffsetGreaterThanPosition
        : whereOffsetGreaterThanPositionOrEqual
    ) - (lazy ? 1 : 0);

  return entriesOffsets.length > 0
    ? (
      initialCharPosition < entriesOffsets[0]
        ? startOffset
        : (entriesOffsets[closestCharPositionIndex] ?? entriesOffsets[entriesOffsets.length - 1]) + 1
    )
    : startOffset;
}

export namespace MaskedField {
  export type Component = <Name extends string> (props: Props<Name>) => JSX.Element;

  export interface Props<Name extends string> extends FieldProps<Name> {
    inputComponent?: ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>>;
    mask: string;
    onChange?: FieldChangeEvent<Name, string>;
    source: string;
    stub?: string;
    value?: string;
  }

  export interface InputProps {
    onChange (e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    type: 'text';
    value: string;
  }

  export interface Mask {
    entriesOffsets: number[];
    payload: string;
    startOffset: number;
    text: string;
  }
}
