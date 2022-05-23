import React, { MouseEvent, PropsWithChildren, useCallback, useContext } from 'react';
import { FormContext } from '../store';
import { SubmitterProps } from '../types/submitter';

function Submitter (props: PropsWithChildren<SubmitterProps>) {
  const { formData } = useContext(FormContext);

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    props.onSubmit(e, formData);
  }, [formData]);

  return (
    <props.buttonComponent
      onClick={onClick}
    />
  );
}

export default Submitter;
