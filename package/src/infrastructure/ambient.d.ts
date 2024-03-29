declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function memo<T extends FunctionComponent<any>> (
    Component: T,
    propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean,
  ): T & Omit<NamedExoticComponent, number>;
}
