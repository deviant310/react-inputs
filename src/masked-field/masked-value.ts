import { Some } from '../utility-types';

export class MaskedValue {
  public static DEFINITION_SYMBOL = '#';

  public entriesOffsets: number[];
  public payload: string;
  public startOffset: number;
  public text: string;

  constructor (private props: MaskedValue.Props) {
    const { definition, dirtyValue, source, stub } = props;

    const capturedEntries = [...dirtyValue.matchAll(RegExp(source, 'g'))]
      .map(match => match[1])
      .filter(Boolean);

    const startOffset = definition.indexOf(MaskedValue.DEFINITION_SYMBOL);
    const entriesOffsets: number[] = [];

    let entryIndex = 0;

    const text = definition.replace(
      RegExp(String.raw`${MaskedValue.DEFINITION_SYMBOL}`, 'g'),
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

    this.entriesOffsets = entriesOffsets;

    this.payload = payload;

    this.startOffset = startOffset;

    this.text = text;
  }

  get firstEntryOffset () {
    return this.entriesOffsets[0];
  }

  get lastEntryOffset () {
    return this.entriesOffsets[this.entriesOffsets.length - 1];
  }

  /**
   * Returns masked value relevant caret position closest to passed position index
   * @param position
   * @param lazy
   */
  getRelevantCaretPositionClosestTo (position: number, lazy?: boolean) {
    const closestCharPosition = position - 1;
    const whereOffsetGreaterThanPositionOrEqual = (offset: number) => offset >= closestCharPosition;
    const whereOffsetGreaterThanPosition = (offset: number) => offset > closestCharPosition;

    const closestCharPositionIndex = this.entriesOffsets
      .findIndex(
        lazy
          ? whereOffsetGreaterThanPosition
          : whereOffsetGreaterThanPositionOrEqual
      ) - (lazy ? 1 : 0);

    return this.entriesOffsets.length > 0
      ? (
        closestCharPosition < this.firstEntryOffset
          ? this.startOffset
          : (this.entriesOffsets[closestCharPositionIndex] ?? this.lastEntryOffset) + 1
      )
      : this.startOffset;
  }

  copyWith (props: Some<MaskedValue.Props>) {
    return new MaskedValue({ ...this.props, ...props });
  }
}

export namespace MaskedValue {
  export type Props = {
    definition: string;
    dirtyValue: string;
    source: string;
    stub: string;
  }
}
