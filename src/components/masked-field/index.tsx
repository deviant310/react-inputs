import {
  ChangeEvent,
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import Form from '../../types/form';

const MASK_PATTERN_SYMBOL = '#';
const MASK_STUB_SYMBOL = '_';

/**
 * MaskedField component
 * @param props
 */
function MaskedFieldFC<Name extends string, Value extends string> (props: MaskedField.Props<Name, Value>) {
  const {
    inputComponent: Input,
    label,
    name,
    mask: maskString,
    onChange,
    source,
    stub,
    value,
  } = props as typeof props & typeof MaskedFieldFC.defaultProps;

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

      return { text, payload, entriesOffsets, startOffset };
    },
    [maskString, source, stub]
  );

  const setCaretPosition = useCallback(
    (position: number) => {
      input.current?.setSelectionRange(position, position);
    },
    []
  );

  const setValues = useCallback(
    (value: Value, displayValue: string) => {
      setDisplayValue(displayValue);

      onChange?.({ [name]: value });
    },
    [onChange, name]
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { value, selectionStart } = target;

      if (!selectionStart) return;

      const mask = getMaskFromRawText(value);
      const caretAt = getMaskRealCaretPositionByInitialCaretPosition(mask, selectionStart);

      setValues(mask.payload as Value, mask.text);

      requestAnimationFrame(() => setCaretPosition(caretAt));
    },
    [getMaskFromRawText, setCaretPosition, setValues]
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

      setValues(mask.payload as Value, mask.text);
    },
    [getMaskFromRawText, setValues]
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
}

MaskedFieldFC.defaultProps = {
  value: '',
  inputComponent: forwardRef<HTMLInputElement, MaskedField.InputProps>((props, ref) => (
    <input {...props} ref={ref}/>
  )),
  stub: MASK_STUB_SYMBOL
};

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

const MaskedField = memo(MaskedFieldFC) as unknown as typeof MaskedFieldFC;

namespace MaskedField {
  export interface Props<Name extends string, Value extends string> extends Form.FieldProps<Name> {
    inputComponent?: ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>>;
    mask: string;
    onChange?: (data: Form.Data<Name, Value>) => void;
    source: string;
    stub?: string;
    value?: Value;
  }

  export interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: 'text';
    value: string;
  }

  export interface Mask {
    text: string;
    payload: string;
    entriesOffsets: number[];
    startOffset: number;
  }
}

export default MaskedField;
