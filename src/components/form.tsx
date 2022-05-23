import React, { PropsWithChildren, useState } from 'react';
import { FormContext } from '../store';
import { FormProps } from '../types/form';

function Form (props: PropsWithChildren<FormProps>) {
  const [formData, setFormData] = useState(props.initialData || {});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {props.children}
    </FormContext.Provider>
  );
}

export default Form;
