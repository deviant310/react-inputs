namespace Form {
  export type Data<Key extends string = string, Value = unknown> = {
    [K in string as Key]: Value;
  };

  export interface FieldProps<Name extends string> {
    name: Name;
    label?: string;
  }
}

export default Form;
