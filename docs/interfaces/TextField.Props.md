[React Form - v1.0.0](../README.md) / [Exports](../modules.md) / [TextField](../modules/TextField.md) / Props

# Interface: Props<Name, Value\>

[TextField](../modules/TextField.md).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `string` |

## Hierarchy

- [`FieldProps`](Form.FieldProps.md)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](TextField.Props.md#inputcomponent)
- [label](TextField.Props.md#label)
- [name](TextField.Props.md#name)
- [onChange](TextField.Props.md#onchange)
- [value](TextField.Props.md#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](TextField.InputProps.md)\>

#### Defined in

components/text-field.tsx:51

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](Form.FieldProps.md).[label](Form.FieldProps.md#label)

#### Defined in

types/form.ts:12

___

### name

• **name**: `Name`

#### Inherited from

[FieldProps](Form.FieldProps.md).[name](Form.FieldProps.md#name)

#### Defined in

types/form.ts:11

___

### onChange

• `Optional` **onChange**: (`data`: [`Data`](../modules/Form.md#data)<`Name`, `Value`\>) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../modules/Form.md#data)<`Name`, `Value`\> |

##### Returns

`void`

#### Defined in

components/text-field.tsx:52

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/text-field.tsx:50
