---
id: "select_input.SelectInputHookResult"
title: "Interface: SelectInputHookResult<OptionData>"
sidebar_label: "SelectInputHookResult"
custom_edit_url: null
---

[select-input](../modules/select_input.md).SelectInputHookResult

## Type parameters

| Name |
| :------ |
| `OptionData` |

## Properties

### inputValue

• **inputValue**: `string`

___

### options

• **options**: [`SelectInputOption`](select_input.SelectInputOption.md)\<`OptionData`\>[]

___

### showDropdown

• **showDropdown**: `boolean`

## Methods

### onContainerBlur

▸ **onContainerBlur**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `FocusEvent`\<`HTMLElement`, `Element`\> |

#### Returns

`void`

___

### onInputChange

▸ **onInputChange**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `ChangeEvent`\<`HTMLInputElement`\> |

#### Returns

`void`
