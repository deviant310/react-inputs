[MaskedField](../modules/MaskedField).Props

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

- [inputComponent](./MaskedField.Props#inputcomponent)
- [label](./MaskedField.Props#label)
- [mask](./MaskedField.Props#mask)
- [name](./MaskedField.Props#name)
- [onChange](./MaskedField.Props#onchange)
- [source](./MaskedField.Props#source)
- [stub](./MaskedField.Props#stub)
- [value](./MaskedField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `ForwardRefExoticComponent`<[`InputProps`](./MaskedField.InputProps) & `RefAttributes`<`HTMLInputElement`\>\>

#### Defined in

components/masked-field/index.tsx:260

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](./Form.FieldProps).[label](./Form.FieldProps#label)

#### Defined in

types/form.ts:12

___

### mask

• **mask**: `string`

#### Defined in

components/masked-field/index.tsx:261

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

components/masked-field/index.tsx:262

___

### source

• **source**: `string`

#### Defined in

components/masked-field/index.tsx:263

___

### stub

• `Optional` **stub**: `string`

#### Defined in

components/masked-field/index.tsx:264

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/masked-field/index.tsx:265
