## Table of contents

### Interfaces

- [FieldProps](../interfaces/Form.FieldProps)

### Type Aliases

- [Data](./Form#data)
- [Payload](./Form#payload)

## Type Aliases

### Data

Ƭ **Data**<`Key`, `Value`\>: { [K in string as Key]: Value }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` = `string` |
| `Value` | `unknown` |

#### Defined in

types/form.ts:2

___

### Payload

Ƭ **Payload**<`T`\>: `Exclude`<{ [K in keyof T]: Pick<T, K\> }[keyof `T`], `undefined`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](./Form#data) |

#### Defined in

types/form.ts:6
