/**
 * @internal
 */
export class Mask {
  private static definitions: MaskDefinitions = {
    "*": /./,
    "0": /\d/,
    a: /[a-zA-Z]/,
  };

  private entries: MaskEntry[];
  private stub: string;

  constructor(public props: MaskProps) {
    const { definitions, dirtyValue, pattern, stub } = props;

    const definitionsPatternChunk = Object.keys({
      ...Mask.definitions,
      ...definitions,
    })
      .map(escapeSpecialCharacters)
      .join("|");

    const maskRegExpPattern = RegExp(
      String.raw`{(?<include>.+?)}|(?<definition>${definitionsPatternChunk})|(?<other>.?)`,
      "g",
    );

    const { entries } = [...pattern.matchAll(maskRegExpPattern)]
      .map(
        ({ groups }) =>
          Object.entries(groups as Record<string, string>).find(
            ([, value]) => typeof value !== "undefined",
          ) as [MaskEntryType, string],
      )
      .reduce(
        (obj, [type, source]) => {
          let dirtyValueMatcher: RegExp | undefined;

          if (type === "definition")
            dirtyValueMatcher =
              Mask.definitions[source as keyof typeof Mask.definitions];

          if (type === "include")
            dirtyValueMatcher = RegExp(escapeSpecialCharacters(source));

          const { 0: value, index: offset } = dirtyValueMatcher
            ? (obj.dirtyValueSlice.match(dirtyValueMatcher) ?? {})
            : ({} as RegExpMatchArray);

          if (typeof offset !== "undefined") {
            obj.dirtyValueSlice = obj.dirtyValueSlice.slice(
              offset + source.length,
            );
          }

          obj.entries.push({ source, type, value });

          return obj;
        },
        {
          dirtyValueSlice: dirtyValue,
          entries: [] as MaskEntry[],
        },
      );

    this.stub = stub;

    this.entries = entries;
  }

  get entriesContainsDefinedValues() {
    return this.entries.some(
      ({ type, value }) => type === "definition" && value,
    );
  }

  get text() {
    return this.entries
      .map(({ source, type, value }) => {
        switch (type) {
          case "include":
          case "other":
            return source;
          case "definition":
            return value ?? this.stub;
        }
      })
      .join("");
  }

  get payload() {
    return this.entries
      .map(({ source, type, value }) => {
        if (typeof value !== "undefined") return value;
        if (type === "include") return source;
      })
      .join("");
  }

  get firstEntryOffset() {
    return this.entriesOffsets[0];
  }

  get lastEntryOffset() {
    return this.entriesOffsets[this.entriesOffsets.length - 1];
  }

  get startOffset() {
    return this.entries
      .slice(
        0,
        this.entries.findIndex(({ type }) => type === "definition"),
      )
      .reduce((length, { source }) => length + source.length, 0);
  }

  get entriesOffsets() {
    const { offsets } = this.entries.reduce(
      (obj, { source, type, value }) => {
        if (value && type === "definition") obj.offsets.push(obj.lastOffset);

        obj.lastOffset += source.length;

        return obj;
      },
      {
        lastOffset: 0,
        offsets: [] as number[],
      },
    );

    return offsets;
  }

  /**
   * Returns masked value relevant caret position closest to passed position index
   * @param position
   * @param lazy
   */
  getRelevantCaretPositionClosestTo(position: number, lazy?: boolean) {
    const closestCharPosition = position - 1;
    const whereOffsetGreaterThanPositionOrEqual = (offset: number) =>
      offset >= closestCharPosition;
    const whereOffsetGreaterThanPosition = (offset: number) =>
      offset > closestCharPosition;

    const closestCharPositionIndex =
      this.entriesOffsets.findIndex(
        lazy
          ? whereOffsetGreaterThanPosition
          : whereOffsetGreaterThanPositionOrEqual,
      ) - (lazy ? 1 : 0);

    return this.entriesOffsets.length > 0
      ? closestCharPosition < this.entriesOffsets[0]
        ? this.startOffset
        : (this.entriesOffsets[closestCharPositionIndex] ??
            this.lastEntryOffset) + 1
      : this.startOffset;
  }

  copyWith(props: Partial<MaskProps>) {
    return new Mask({ ...this.props, ...props });
  }
}

function escapeSpecialCharacters(string: string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export type MaskProps = {
  definitions?: MaskDefinitions;
  dirtyValue: string;
  pattern: string;
  stub: string;
};

export type MaskDefinitions = Record<string, RegExp>;

export interface MaskEntry {
  source: string;
  type: MaskEntryType;
  value?: string;
}

export type MaskEntryType = "include" | "definition" | "other";
