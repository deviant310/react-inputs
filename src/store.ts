import { createContext } from 'react';
import { FormContextDefaultValue } from './types/form';

export const FormContext = createContext(null as unknown as FormContextDefaultValue);
