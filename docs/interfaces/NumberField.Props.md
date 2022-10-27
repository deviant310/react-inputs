[NumberField](../modules/NumberField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `number` |

## Hierarchy

- [`FieldProps`](./Form.FieldProps)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [inputComponent](./NumberField.Props#inputcomponent)
- [label](./NumberField.Props#label)
- [max](./NumberField.Props#max)
- [min](./NumberField.Props#min)
- [name](./NumberField.Props#name)
- [onChange](./NumberField.Props#onchange)
- [value](./NumberField.Props#value)

## Properties

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](../modules/NumberField#inputprops)\>

#### Defined in

components/number-field.tsx:82

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](./Form.FieldProps).[label](./Form.FieldProps#label)

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

components/number-field.tsx:85

___

### value

• `Optional` **value**: `Value`

#### Defined in

components/number-field.tsx:81
