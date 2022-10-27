[TextField](../modules/TextField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `string` |

## Hierarchy

- [`FieldProps`](./Form.FieldProps)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](./TextField.Props#inputcomponent)
- [label](./TextField.Props#label)
- [name](./TextField.Props#name)
- [onChange](./TextField.Props#onchange)
- [value](./TextField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](./TextField.InputProps)\>

#### Defined in

components/text-field.tsx:51

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](./Form.FieldProps).[label](./Form.FieldProps#label)

#### Defined in

types/form.ts:12

___

### name

• **name**: `Name`

#### Inherited from

[FieldProps](./Form.FieldProps).[name](./Form.FieldProps#name)

#### Defined in

types/form.ts:11

___

### onChange

• `Optional` **onChange**: (`data`: [`Data`](../modules/Form#data)<`Name`, `Value`\>) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../modules/Form#data)<`Name`, `Value`\> |

##### Returns

`void`

#### Defined in

components/text-field.tsx:52

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/text-field.tsx:50
