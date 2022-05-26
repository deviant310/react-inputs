import { FunctionComponent, MouseEvent, PropsWithChildren } from 'react';

export type SubmitButtonProps = PropsWithChildren<{
  onClick: (e: MouseEvent<HTMLElement>) => void;
}>

export type SubmitProps = PropsWithChildren<{
  buttonComponent: FunctionComponent<SubmitButtonProps>;
}>
