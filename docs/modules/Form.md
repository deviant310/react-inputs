[React Form - v1.0.0](../README.md) / [Exports](../modules.md) / Form

# Namespace: Form

## Table of contents

### Interfaces

- [FieldProps](../interfaces/Form.FieldProps.md)

### Type Aliases

- [Data](Form.md#data)
- [Payload](Form.md#payload)

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
| `T` | extends [`Data`](Form.md#data) |

#### Defined in

types/form.ts:6
