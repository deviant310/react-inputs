---
id: "masked_input.MaskedInput"
title: "Namespace: MaskedInput"
sidebar_label: "MaskedInput"
custom_edit_url: null
---

[masked-input](../modules/masked_input.md).MaskedInput

## Interfaces

- [Component](../interfaces/masked_input.MaskedInput.Component.md)
- [Props](../interfaces/masked_input.MaskedInput.Props.md)
- [InputProps](../interfaces/masked_input.MaskedInput.InputProps.md)
- [Hook](../interfaces/masked_input.MaskedInput.Hook.md)
- [HookProps](../interfaces/masked_input.MaskedInput.HookProps.md)
- [HookResult](../interfaces/masked_input.MaskedInput.HookResult.md)
- [MaskEntry](../interfaces/masked_input.MaskedInput.MaskEntry.md)

## Type Aliases

### InputComponent

Ƭ **InputComponent**: `ForwardRefExoticComponent`\<`PropsWithoutRef`\<[`InputProps`](../interfaces/masked_input.MaskedInput.InputProps.md)\> & `RefAttributes`\<`HTMLInputElement`\>\>

___

### Value

Ƭ **Value**: `string`

___

### MaskProps

Ƭ **MaskProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dirtyValue` | `string` |
| `pattern` | `string` |
| `stub` | `string` |
| `definitions?` | [`MaskDefinitions`](masked_input.MaskedInput.md#maskdefinitions) |

___

### MaskDefinitions

Ƭ **MaskDefinitions**: `Record`\<`string`, `RegExp`\>

___

### MaskEntryType

Ƭ **MaskEntryType**: ``"include"`` \| ``"definition"`` \| ``"other"``
