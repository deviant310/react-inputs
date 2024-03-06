---
id: "masked_input.MaskedInputProps"
title: "Interface: MaskedInputProps<Name>"
sidebar_label: "MaskedInputProps"
custom_edit_url: null
---

[masked-input](../modules/masked_input.md).MaskedInputProps

## Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

## Hierarchy

- `CompoundInputProps`\<`Name`, [`MaskedInputValue`](../modules/masked_input.md#maskedinputvalue)\>

- [`MaskedInputHookProps`](masked_input.MaskedInputHookProps.md)

  ↳ **`MaskedInputProps`**

## Properties

### setValue

• **setValue**: `Dispatch`\<`string`\>

#### Inherited from

[MaskedInputHookProps](masked_input.MaskedInputHookProps.md).[setValue](masked_input.MaskedInputHookProps.md#setvalue)

___

### value

• **value**: `string`

#### Inherited from

[MaskedInputHookProps](masked_input.MaskedInputHookProps.md).[value](masked_input.MaskedInputHookProps.md#value)

___

### mask

• **mask**: `string`

#### Inherited from

[MaskedInputHookProps](masked_input.MaskedInputHookProps.md).[mask](masked_input.MaskedInputHookProps.md#mask)

___

### inputComponent

• `Optional` **inputComponent**: [`MaskedInputCoreComponent`](../modules/masked_input.md#maskedinputcorecomponent)

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

### definitions

• `Optional` **definitions**: `Record`\<`string`, `RegExp`\>

#### Inherited from

[MaskedInputHookProps](masked_input.MaskedInputHookProps.md).[definitions](masked_input.MaskedInputHookProps.md#definitions)

___

### stub

• `Optional` **stub**: `string`

#### Inherited from

[MaskedInputHookProps](masked_input.MaskedInputHookProps.md).[stub](masked_input.MaskedInputHookProps.md#stub)
