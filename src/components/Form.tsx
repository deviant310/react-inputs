import React, { Fragment, ReactElement } from 'react';
import Field from './Field';
import { Form as FormProps, FormField as FormFieldProps } from '../types/Form';

Form.defaultProps = {
  renderFieldset: (fieldProps: FormFieldProps, fieldElement: ReactElement) => (
    <Fragment key={fieldProps.id}>{fieldElement}</Fragment>
  )
};

export default function Form (props: FormProps & typeof Form.defaultProps) {
  const { fields, renderFieldset } = props;

  return (
    <>
      {fields.map(field => {
        return renderFieldset(field, (
          <Field {...field}/>
        ));
      })}
    </>
  );
}
