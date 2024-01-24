type Some<T> = Exclude<{
  [K in keyof T]: Pick<T, K>;
}[keyof T], undefined>;
