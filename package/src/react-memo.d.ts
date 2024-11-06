/// <reference types="react" />

declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function memo<T extends React.FunctionComponent<any>>(
    Component: T,
    propsAreEqual?: (
      prevProps: Readonly<React.ComponentProps<T>>,
      nextProps: Readonly<React.ComponentProps<T>>,
    ) => boolean,
  ): T & Omit<React.NamedExoticComponent, number>;
}
