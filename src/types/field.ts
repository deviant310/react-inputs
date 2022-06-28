import { FormData } from './form';

export interface BaseFieldProps<Key extends keyof FormData> {
  name: Key;
}
