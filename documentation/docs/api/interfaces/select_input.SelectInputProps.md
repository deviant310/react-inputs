---
id: "select_input.SelectInputProps"
title: "Interface: SelectInputProps<Name, OptionData>"
sidebar_label: "SelectInputProps"
custom_edit_url: null
---

[select-input](../modules/select_input.md).SelectInputProps

Select input main component props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `OptionData` | `OptionData` |

## Hierarchy

- `CompoundInputProps`\<`Name`, [`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>\>

- [`SelectInputHookProps`](select_input.SelectInputHookProps.md)\<`OptionData`\>

  ↳ **`SelectInputProps`**

## Properties

### optionComponent

• **optionComponent**: [`SelectInputOptionComponent`](../modules/select_input.md#selectinputoptioncomponent)\<`OptionData`\>

Option component from which options list are rendering

___

### setValue

• **setValue**: `Dispatch`\<[`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>\>

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[setValue](select_input.SelectInputHookProps.md#setvalue)

___

### value

• **value**: [`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[value](select_input.SelectInputHookProps.md#value)

___

### containerComponent

• `Optional` **containerComponent**: [`SelectInputContainerComponent`](select_input.SelectInputContainerComponent.md)

Custom container component

___

### dropdownComponent

• `Optional` **dropdownComponent**: [`SelectInputDropdownComponent`](../modules/select_input.md#selectinputdropdowncomponent)

Custom dropdown component

___

### inputComponent

• `Optional` **inputComponent**: [`SelectInputCoreComponent`](../modules/select_input.md#selectinputcorecomponent)

Custom input component

___

### label

• `Optional` **label**: `string`

#### Inherited from

CompoundInputProps.label

___

### name

• `Optional` **name**: `Name`

#### Inherited from

CompoundInputProps.name

___

### dropdownIsVisibleByDefault

• `Optional` **dropdownIsVisibleByDefault**: `boolean`

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[dropdownIsVisibleByDefault](select_input.SelectInputHookProps.md#dropdownisvisiblebydefault)

## Methods

### displayStringForOption

▸ **displayStringForOption**(`option`): `string`

A function that should return the string to display in the input when the option is selected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `OptionData` | Data of selected option |

#### Returns

`string`

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[displayStringForOption](select_input.SelectInputHookProps.md#displaystringforoption)

___

### getOptionKey

▸ **getOptionKey**(`option`): [`SelectInputOptionKey`](../modules/select_input.md#selectinputoptionkey)

A function that should return option key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `OptionData` | Data of selected option |

#### Returns

[`SelectInputOptionKey`](../modules/select_input.md#selectinputoptionkey)

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[getOptionKey](select_input.SelectInputHookProps.md#getoptionkey)

___

### optionsBuilder

▸ **optionsBuilder**(`editingValue`): `OptionData`[]

A function that should return the current selectable options array given the current editing value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `editingValue` | `string` |

#### Returns

`OptionData`[]

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[optionsBuilder](select_input.SelectInputHookProps.md#optionsbuilder)

___

### onBlur

▸ **onBlur**(`event`): `void`

Container blur event handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `FocusEvent`\<`HTMLElement`, `Element`\> |

#### Returns

`void`

#### Inherited from

[SelectInputHookProps](select_input.SelectInputHookProps.md).[onBlur](select_input.SelectInputHookProps.md#onblur)
