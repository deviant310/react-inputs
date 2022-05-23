import { FunctionComponent, MouseEvent } from 'react';

export interface SubmitterButtonProps {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

export interface SubmitterProps {
  onSubmit: (e: MouseEvent<HTMLElement>, data: Record<string, unknown>) => void;
  buttonComponent: FunctionComponent<SubmitterButtonProps>;
}
