---
id: "masked_input"
title: "Module: masked-input"
sidebar_label: "masked-input"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [MaskedInputProps](../interfaces/masked_input.MaskedInputProps.md)
- [MaskedInputCoreProps](../interfaces/masked_input.MaskedInputCoreProps.md)
- [MaskedInputHook](../interfaces/masked_input.MaskedInputHook.md)
- [MaskedInputHookProps](../interfaces/masked_input.MaskedInputHookProps.md)
- [MaskedInputHookResult](../interfaces/masked_input.MaskedInputHookResult.md)
- [MaskEntry](../interfaces/masked_input.MaskEntry.md)

## Main component

### MaskedInput

▸ **MaskedInput**\<`Name`\>(`props`): `Element`

A component for helping the user entering some text by configured mask.
Input pattern is determined by [MaskedInputProps.mask](../interfaces/masked_input.MaskedInputHookProps.md#mask) parameter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`MaskedInputProps`](../interfaces/masked_input.MaskedInputProps.md)\<`Name`\> |

#### Returns

`Element`

## Hooks

### useMaskedInput

▸ **useMaskedInput**(`props`): [`MaskedInputHookResult`](../interfaces/masked_input.MaskedInputHookResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`MaskedInputHookProps`](../interfaces/masked_input.MaskedInputHookProps.md) |

#### Returns

[`MaskedInputHookResult`](../interfaces/masked_input.MaskedInputHookResult.md)

## Other

### MaskedInputCoreComponent

Ƭ **MaskedInputCoreComponent**: `ForwardRefExoticComponent`\<`PropsWithoutRef`\<[`MaskedInputCoreProps`](../interfaces/masked_input.MaskedInputCoreProps.md)\> & `RefAttributes`\<`HTMLInputElement`\>\>

___

### MaskedInputValue

Ƭ **MaskedInputValue**: `string`

___

### MaskProps

Ƭ **MaskProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dirtyValue` | `string` |
| `pattern` | `string` |
| `stub` | `string` |
| `definitions?` | [`MaskDefinitions`](masked_input.md#maskdefinitions) |

___

### MaskDefinitions

Ƭ **MaskDefinitions**: `Record`\<`string`, `RegExp`\>

___

### MaskEntryType

Ƭ **MaskEntryType**: ``"include"`` \| ``"definition"`` \| ``"other"``
