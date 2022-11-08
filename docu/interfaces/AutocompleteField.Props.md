[react-form - v1.0.0](../README.md) / [AutocompleteField](../modules/AutocompleteField.md) / Props

# Interface: Props<Name, Option\>

[AutocompleteField](../modules/AutocompleteField.md).Props

Autocomplete field props interface

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Option` | `Option` |

## Hierarchy

- [`FieldProps`](FieldProps.md)<`Name`\>

  ↳ **`Props`**

## Table of contents

### Methods

- [displayValueForOption](AutocompleteField.Props.md#displayvalueforoption)
- [getOptionKey](AutocompleteField.Props.md#getoptionkey)
- [optionsBuilder](AutocompleteField.Props.md#optionsbuilder)

### Properties

- [optionComponent](AutocompleteField.Props.md#optioncomponent)
- [name](AutocompleteField.Props.md#name)
- [containerComponent](AutocompleteField.Props.md#containercomponent)
- [dropdownComponent](AutocompleteField.Props.md#dropdowncomponent)
- [inputComponent](AutocompleteField.Props.md#inputcomponent)
- [onChange](AutocompleteField.Props.md#onchange)
- [selected](AutocompleteField.Props.md#selected)
- [label](AutocompleteField.Props.md#label)

## Methods

### displayValueForOption

▸ **displayValueForOption**(`option`): `string`

A function that should return the string to display in the input when the option is selected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

#### Returns

`string`

___

### getOptionKey

▸ **getOptionKey**(`option`): `string` \| `number`

A function that should return the unique key to identify every option component in React DOM tree.

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

#### Returns

`string` \| `number`

___

### optionsBuilder

▸ **optionsBuilder**(`editingValue`): `Option`[]

A function that should return the current selectable options array given the current editing value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `editingValue` | `string` |

#### Returns

`Option`[]

## Properties

### optionComponent

• **optionComponent**: `FunctionComponent`<[`OptionProps`](AutocompleteField.OptionProps.md)<`Option`\>\>

Option component from which options list are rendering

___

### name

• **name**: `Name`

#### Inherited from

[FieldProps](FieldProps.md).[name](FieldProps.md#name)

___

### containerComponent

• `Optional` **containerComponent**: `FunctionComponent`<[`ContainerProps`](../modules/AutocompleteField.md#containerprops)\>

Custom container component

___

### dropdownComponent

• `Optional` **dropdownComponent**: `FunctionComponent`<[`DropdownProps`](../modules/AutocompleteField.md#dropdownprops)\>

___

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](AutocompleteField.InputProps.md)\>

Custom input component

___

### onChange

• `Optional` **onChange**: [`FieldChangeEvent`](FieldChangeEvent.md)<`Name`, ``null`` \| `Option`\>

Field change event handler

___

### selected

• `Optional` **selected**: ``null`` \| `Option`

Current selected option

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](FieldProps.md).[label](FieldProps.md#label)
