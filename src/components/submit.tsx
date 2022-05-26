import React, { PropsWithChildren, useCallback } from 'react';
import { useForm } from '../store';
import { SubmitProps, SubmitButtonProps } from '../types/submit';

function Submit (props: PropsWithChildren<SubmitProps>) {
  const finalProps = props as typeof props & typeof Submit.defaultProps;
  const { formData, onSubmit } = useForm() ?? {};

  const onClick = useCallback(() => {
    onSubmit !== undefined && onSubmit(formData);
  }, [formData]);

  return (
    <finalProps.buttonComponent onClick={onClick}>
      {finalProps.children}
    </finalProps.buttonComponent>
  );
}

Submit.defaultProps = {
  buttonComponent: (props: SubmitButtonProps) => <button {...props}/>
};

export default Submit;
