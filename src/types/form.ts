namespace Form {
  export type Data<Key extends string = string, Value = unknown> = {
    [K in string as Key]: Value;
  };

  export type Payload<T extends Data> = Exclude<{
    [K in keyof T]: Pick<T, K>;
  }[keyof T], undefined>;

  export interface FieldProps<Name extends string> {
    name: Name;
    label?: string;
  }
}

export default Form;
