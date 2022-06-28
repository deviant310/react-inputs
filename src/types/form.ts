export type FormData = {
  [key: string]: unknown;
}

export type FormDataAggregator<T extends FormData> = (key: keyof T, value?: T[keyof T]) => void;
