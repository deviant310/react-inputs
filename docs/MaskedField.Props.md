# Interface: Props<Name, Value\>

[MaskedField](../wiki/MaskedField).Props

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

- [inputComponent](../wiki/MaskedField.Props#inputcomponent)
- [label](../wiki/MaskedField.Props#label)
- [mask](../wiki/MaskedField.Props#mask)
- [name](../wiki/MaskedField.Props#name)
- [onChange](../wiki/MaskedField.Props#onchange)
- [source](../wiki/MaskedField.Props#source)
- [stub](../wiki/MaskedField.Props#stub)
- [value](../wiki/MaskedField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `ForwardRefExoticComponent`<[`InputProps`](../wiki/MaskedField.InputProps) & `RefAttributes`<`HTMLInputElement`\>\>

#### Defined in

components/masked-field/index.tsx:260

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[label](../wiki/Form.FieldProps#label)

#### Defined in

types/form.ts:8

___

### mask

• **mask**: `string`

#### Defined in

components/masked-field/index.tsx:261

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
