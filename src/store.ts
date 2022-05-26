import { Context, createContext, useContext } from 'react';
import { FormData, FormValues } from './types/form';

export interface FormContextDefaultValue<State = FormData> {
  formData: State;
  setFormProperty: (key: keyof State, value: Exclude<State[keyof State], undefined>) => void;
  onSubmit?: (data?: State) => void;
}

const FormContext = createContext(null as FormContextDefaultValue | null);

export const useForm = <Value = FormValues> () => useContext(
  FormContext as Context<FormContextDefaultValue<FormData<Value | undefined>> | null>
);
export const FormContextProvider = FormContext.Provider;
