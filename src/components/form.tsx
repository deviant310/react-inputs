import React, { Fragment, ReactElement } from 'react';
import Field from './field';
import { FormProps, FormFieldProps } from '../types/form';

Form.defaultProps = {
  renderFieldset: (fieldProps: FormFieldProps, fieldElement: ReactElement) => (
    <Fragment key={fieldProps.id}>{fieldElement}</Fragment>
  )
};

export default function Form (props: FormProps & typeof Form.defaultProps) {
  const { fields, renderFieldset } = props;

  return (
    <>
      {fields.map(field => (
        <Fragment key={field.id}>
          {renderFieldset(field, <Field {...field}/>)}
        </Fragment>
      ))}
    </>
  );
}
