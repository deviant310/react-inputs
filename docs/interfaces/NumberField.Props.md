[React Form - v1.0.0](../README.md) / [Exports](../modules.md) / [NumberField](../modules/NumberField.md) / Props

# Interface: Props<Name, Value\>

[NumberField](../modules/NumberField.md).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `number` |

## Hierarchy

- [`FieldProps`](Form.FieldProps.md)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](NumberField.Props.md#inputcomponent)
- [label](NumberField.Props.md#label)
- [max](NumberField.Props.md#max)
- [min](NumberField.Props.md#min)
- [name](NumberField.Props.md#name)
- [onChange](NumberField.Props.md#onchange)
- [value](NumberField.Props.md#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](../modules/NumberField.md#inputprops)\>

#### Defined in

components/number-field.tsx:82

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](Form.FieldProps.md).[label](Form.FieldProps.md#label)

#### Defined in

types/form.ts:12

___

### max

• `Optional` **max**: `number`

#### Defined in

components/number-field.tsx:83

___

### min

• `Optional` **min**: `number`

#### Defined in

components/number-field.tsx:84

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

components/number-field.tsx:85

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/number-field.tsx:81
