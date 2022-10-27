[React Form - v1.0.0](../README.md) / [Exports](../modules.md) / [MaskedField](../modules/MaskedField.md) / Props

# Interface: Props<Name, Value\>

[MaskedField](../modules/MaskedField.md).Props

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

- [inputComponent](MaskedField.Props.md#inputcomponent)
- [label](MaskedField.Props.md#label)
- [mask](MaskedField.Props.md#mask)
- [name](MaskedField.Props.md#name)
- [onChange](MaskedField.Props.md#onchange)
- [source](MaskedField.Props.md#source)
- [stub](MaskedField.Props.md#stub)
- [value](MaskedField.Props.md#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `ForwardRefExoticComponent`<[`InputProps`](MaskedField.InputProps.md) & `RefAttributes`<`HTMLInputElement`\>\>

#### Defined in

components/masked-field/index.tsx:260

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](Form.FieldProps.md).[label](Form.FieldProps.md#label)

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
