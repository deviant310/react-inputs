# Interface: Props<Key, Option\>

[AutocompleteField](../wiki/AutocompleteField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

## Hierarchy

- [`FieldProps`](../wiki/Form.FieldProps)<`Key`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [containerComponent](../wiki/AutocompleteField.Props#containercomponent)
- [displayValueForOption](../wiki/AutocompleteField.Props#displayvalueforoption)
- [dropdownComponent](../wiki/AutocompleteField.Props#dropdowncomponent)
- [getOptionKey](../wiki/AutocompleteField.Props#getoptionkey)
- [inputComponent](../wiki/AutocompleteField.Props#inputcomponent)
- [label](../wiki/AutocompleteField.Props#label)
- [name](../wiki/AutocompleteField.Props#name)
- [onSelect](../wiki/AutocompleteField.Props#onselect)
- [optionComponent](../wiki/AutocompleteField.Props#optioncomponent)
- [optionsBuilder](../wiki/AutocompleteField.Props#optionsbuilder)
- [selected](../wiki/AutocompleteField.Props#selected)

## Properties

### containerComponent

• `Optional` **containerComponent**: `FunctionComponent`<[`ContainerProps`](../wiki/AutocompleteField#containerprops)\>

#### Defined in

components/autocomplete-field/index.tsx:158

___

### displayValueForOption

• **displayValueForOption**: (`option`: `Option`) => `string`

#### Type declaration

▸ (`option`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

##### Returns

`string`

#### Defined in

components/autocomplete-field/index.tsx:154

___

### dropdownComponent

• `Optional` **dropdownComponent**: `FunctionComponent`<[`DropdownProps`](../wiki/AutocompleteField#dropdownprops)\>

#### Defined in

components/autocomplete-field/index.tsx:159

___

### getOptionKey

• **getOptionKey**: (`option`: `Option`) => `string` \| `number`

#### Type declaration

▸ (`option`): `string` \| `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

##### Returns

`string` \| `number`

#### Defined in

components/autocomplete-field/index.tsx:153

___

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](../wiki/AutocompleteField.InputProps)\>

#### Defined in

components/autocomplete-field/index.tsx:160

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[label](../wiki/Form.FieldProps#label)

#### Defined in

types/form.ts:8

___

### name

• **name**: `Key`

#### Inherited from

[FieldProps](../wiki/Form.FieldProps).[name](../wiki/Form.FieldProps#name)

#### Defined in

types/form.ts:7

___

### onSelect

• `Optional` **onSelect**: (`data`: [`Data`](../wiki/Form#data)<`Key`, ``null`` \| `Option`\>) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../wiki/Form#data)<`Key`, ``null`` \| `Option`\> |

##### Returns

`void`

#### Defined in

components/autocomplete-field/index.tsx:157

___

### optionComponent

• **optionComponent**: `FunctionComponent`<[`OptionProps`](../wiki/AutocompleteField#optionprops)<`Option`\>\>

#### Defined in

components/autocomplete-field/index.tsx:155

___

### optionsBuilder

• **optionsBuilder**: (`editingValue`: `string`) => `Option`[]

#### Type declaration

▸ (`editingValue`): `Option`[]

Build options array depending on editing value

##### Parameters

| Name | Type |
| :------ | :------ |
| `editingValue` | `string` |

##### Returns

`Option`[]

#### Defined in

components/autocomplete-field/index.tsx:152

___

### selected

• `Optional` **selected**: ``null`` \| `Option`

#### Defined in

components/autocomplete-field/index.tsx:156
