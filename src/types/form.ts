import { Dispatch, SetStateAction } from 'react';

export type FormData = Record<string, unknown>;

export interface FormContextDefaultValue {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export interface FormProps {
  initialData?: FormData;
}
