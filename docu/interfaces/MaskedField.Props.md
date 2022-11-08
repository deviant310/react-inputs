[react-form - v1.0.0](../README.md) / [MaskedField](../modules/MaskedField.md) / Props

# Interface: Props<Name\>

[MaskedField](../modules/MaskedField.md).Props

Base field props interface

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

## Hierarchy

- [`FieldProps`](FieldProps.md)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [mask](MaskedField.Props.md#mask)
- [source](MaskedField.Props.md#source)
- [name](MaskedField.Props.md#name)
- [inputComponent](MaskedField.Props.md#inputcomponent)
- [onChange](MaskedField.Props.md#onchange)
- [stub](MaskedField.Props.md#stub)
- [value](MaskedField.Props.md#value)
- [label](MaskedField.Props.md#label)

## Properties

### mask

• **mask**: `string`

___

### source

• **source**: `string`

___

### name

• **name**: `Name`

#### Inherited from

[FieldProps](FieldProps.md).[name](FieldProps.md#name)

___

### inputComponent

• `Optional` **inputComponent**: `ForwardRefExoticComponent`<[`InputProps`](MaskedField.InputProps.md) & `RefAttributes`<`HTMLInputElement`\>\>

___

### onChange

• `Optional` **onChange**: [`FieldChangeEvent`](FieldChangeEvent.md)<`Name`, `string`\>

___

### stub

• `Optional` **stub**: `string`

___

### value

• `Optional` **value**: `string`

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](FieldProps.md).[label](FieldProps.md#label)
