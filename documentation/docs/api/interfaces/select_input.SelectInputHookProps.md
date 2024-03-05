---
id: "select_input.SelectInputHookProps"
title: "Interface: SelectInputHookProps<OptionData>"
sidebar_label: "SelectInputHookProps"
custom_edit_url: null
---

[select-input](../modules/select_input.md).SelectInputHookProps

Select input hook props

## Type parameters

| Name |
| :------ |
| `OptionData` |

## Hierarchy

- `CompoundInputHookProps`\<[`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>\>

  ↳ **`SelectInputHookProps`**

  ↳↳ [`SelectInputProps`](select_input.SelectInputProps.md)

## Properties

### setValue

• **setValue**: `Dispatch`\<[`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>\>

#### Inherited from

CompoundInputHookProps.setValue

___

### value

• **value**: [`SelectInputValue`](../modules/select_input.md#selectinputvalue)\<`OptionData`\>

#### Inherited from

CompoundInputHookProps.value

___

### dropdownIsVisibleByDefault

• `Optional` **dropdownIsVisibleByDefault**: `boolean`

## Methods

### displayStringForOption

▸ **displayStringForOption**(`option`): `string`

A function that should return the string to display in the input when the option is selected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `OptionData` | The first input number |

#### Returns

`string`

___

### getOptionKey

▸ **getOptionKey**(`option`): [`SelectInputOptionKey`](../modules/select_input.md#selectinputoptionkey)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `OptionData` | The first input number |

#### Returns

[`SelectInputOptionKey`](../modules/select_input.md#selectinputoptionkey)

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
