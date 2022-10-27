# Interface: Props<Name, Value\>

[NumberField](../wiki/NumberField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `number` |

## Hierarchy

- [`FieldProps`](../wiki/Form.FieldProps)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](../wiki/NumberField.Props#inputcomponent)
- [label](../wiki/NumberField.Props#label)
- [max](../wiki/NumberField.Props#max)
- [min](../wiki/NumberField.Props#min)
- [name](../wiki/NumberField.Props#name)
- [onChange](../wiki/NumberField.Props#onchange)
- [value](../wiki/NumberField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](../wiki/NumberField#inputprops)\>

#### Defined in

components/number-field.tsx:82

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[label](../wiki/Form.FieldProps#label)

#### Defined in

types/form.ts:8

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

components/number-field.tsx:85

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/number-field.tsx:81
