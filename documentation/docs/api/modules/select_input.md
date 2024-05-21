---
id: "select_input"
title: "Module: select-input"
sidebar_label: "select-input"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [SelectInputProps](../interfaces/select_input.SelectInputProps.md)
- [SelectInputContainerComponent](../interfaces/select_input.SelectInputContainerComponent.md)
- [SelectInputContainerProps](../interfaces/select_input.SelectInputContainerProps.md)
- [SelectInputCoreProps](../interfaces/select_input.SelectInputCoreProps.md)
- [SelectInputOptionProps](../interfaces/select_input.SelectInputOptionProps.md)
- [SelectInputHook](../interfaces/select_input.SelectInputHook.md)
- [SelectInputHookProps](../interfaces/select_input.SelectInputHookProps.md)
- [SelectInputOption](../interfaces/select_input.SelectInputOption.md)
- [SelectInputHookResult](../interfaces/select_input.SelectInputHookResult.md)

## Main component

### SelectInput

▸ **SelectInput**\<`Name`, `OptionData`\>(`props`): `Element`

A component for helping the user make a selection by entering some text and choosing from among a list of options.

The user's text input is received by [SelectInputProps.displayStringForOption](../interfaces/select_input.SelectInputProps.md#displaystringforoption) parameter.
The options to be displayed are determined using [SelectInputProps.optionsBuilder](../interfaces/select_input.SelectInputProps.md#optionsbuilder)
and rendered with [SelectInputProps.optionComponent](../interfaces/select_input.SelectInputProps.md#optioncomponent).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `OptionData` | `OptionData` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SelectInputProps`](../interfaces/select_input.SelectInputProps.md)\<`Name`, `OptionData`\> |

#### Returns

`Element`

**`See`**

[Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)

## Hooks

### useSelectInput

▸ **useSelectInput**\<`OptionData`\>(`props`): [`SelectInputHookResult`](../interfaces/select_input.SelectInputHookResult.md)\<`OptionData`\>

#### Type parameters

| Name |
| :------ |
| `OptionData` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SelectInputHookProps`](../interfaces/select_input.SelectInputHookProps.md)\<`OptionData`\> |

#### Returns

[`SelectInputHookResult`](../interfaces/select_input.SelectInputHookResult.md)\<`OptionData`\>

## Other

### SelectInputDropdownComponent

Ƭ **SelectInputDropdownComponent**: `FunctionComponent`\<[`SelectInputDropdownProps`](select_input.md#selectinputdropdownprops)\>

___

### SelectInputDropdownProps

Ƭ **SelectInputDropdownProps**: `PropsWithChildren`\<`HTMLAttributes`\<`HTMLElement`\> & \{ `role`: ``"dialog"``  }\>

___

### SelectInputCoreComponent

Ƭ **SelectInputCoreComponent**: `FunctionComponent`\<[`SelectInputCoreProps`](../interfaces/select_input.SelectInputCoreProps.md)\>

___

### SelectInputOptionComponent

Ƭ **SelectInputOptionComponent**\<`OptionData`\>: `FunctionComponent`\<[`SelectInputOptionProps`](../interfaces/select_input.SelectInputOptionProps.md)\<`OptionData`\>\>

#### Type parameters

| Name |
| :------ |
| `OptionData` |

___

### SelectInputOptionKey

Ƭ **SelectInputOptionKey**: `string` \| `number`

___

### SelectInputValue

Ƭ **SelectInputValue**\<`OptionData`\>: `OptionData` \| ``null``

#### Type parameters

| Name |
| :------ |
| `OptionData` |
