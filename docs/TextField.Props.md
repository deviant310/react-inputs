# Interface: Props<Name, Value\>

[TextField](../wiki/TextField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `string` |

## Hierarchy

- [`FieldProps`](../wiki/Form.FieldProps)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](../wiki/TextField.Props#inputcomponent)
- [label](../wiki/TextField.Props#label)
- [name](../wiki/TextField.Props#name)
- [onChange](../wiki/TextField.Props#onchange)
- [value](../wiki/TextField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](../wiki/TextField.InputProps)\>

#### Defined in

components/text-field.tsx:51

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[label](../wiki/Form.FieldProps#label)

#### Defined in

types/form.ts:8

___

### name

• **name**: `Name`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[name](../wiki/Form.FieldProps#name)

#### Defined in

types/form.ts:7

___

### onChange

• `Optional` **onChange**: (`data`: [`Data`](../wiki/Form#data)<`Name`, `Value`\>) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../wiki/Form#data)<`Name`, `Value`\> |

##### Returns

`void`

#### Defined in

components/text-field.tsx:52

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/text-field.tsx:50
