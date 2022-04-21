import React, { Fragment, ReactElement } from 'react';
import Field from './Field';
import { FormProps, FormFieldProps } from '../types/Form';

Form.defaultProps = {
  renderFieldset: (fieldProps: FormFieldProps, fieldElement: ReactElement) => (
    <Fragment key={fieldProps.id}>{fieldElement}</Fragment>
  )
};

export default function Form (props: FormProps & typeof Form.defaultProps) {
  const { fields, renderFieldset } = props;

  return (
    <>
      {fields.map(field => renderFieldset(field, (
        <Field {...field}/>
      )))}
    </>
  );
}
