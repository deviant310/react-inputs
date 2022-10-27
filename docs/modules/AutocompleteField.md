## Table of contents

### Interfaces

- [InputProps](../interfaces/AutocompleteField.InputProps)
- [Props](../interfaces/AutocompleteField.Props)

### Type Aliases

- [ContainerProps](./AutocompleteField#containerprops)
- [DropdownProps](./AutocompleteField#dropdownprops)
- [OptionKeyExtractor](./AutocompleteField#optionkeyextractor)
- [OptionProps](./AutocompleteField#optionprops)
- [OptionValueExtractor](./AutocompleteField#optionvalueextractor)
- [OptionsBuilder](./AutocompleteField#optionsbuilder)
- [SelectEventHandler](./AutocompleteField#selecteventhandler)

## Type Aliases

### ContainerProps

Ƭ **ContainerProps**: `PropsWithChildren`<{ `onBlur`: (`e`: `FocusEvent`<`HTMLInputElement`\>) => `void` ; `role`: ``"group"`` ; `tabIndex`: `number`  }\>

#### Defined in

components/autocomplete-field/index.tsx:224

___

### DropdownProps

Ƭ **DropdownProps**: `PropsWithChildren`<{ `role`: ``"dialog"``  }\>

#### Defined in

components/autocomplete-field/index.tsx:230

___

### OptionKeyExtractor

Ƭ **OptionKeyExtractor**<`Option`\>: (`option`: `Option`) => `string` \| `number`

#### Type parameters

| Name |
| :------ |
| `Option` |

#### Type declaration

▸ (`option`): `string` \| `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

##### Returns

`string` \| `number`

#### Defined in

components/autocomplete-field/index.tsx:218

___

### OptionProps

Ƭ **OptionProps**<`Data`\>: `Option.ComponentProps`<`Data`\>

#### Type parameters

| Name |
| :------ |
| `Data` |

#### Defined in

components/autocomplete-field/index.tsx:241

___

### OptionValueExtractor

Ƭ **OptionValueExtractor**<`Option`\>: (`option`: `Option`) => `string`

#### Type parameters

| Name |
| :------ |
| `Option` |

#### Type declaration

▸ (`option`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option` |

##### Returns

`string`

#### Defined in

components/autocomplete-field/index.tsx:220

___

### OptionsBuilder

Ƭ **OptionsBuilder**<`Option`\>: (`editingValue`: `string`) => `Option`[]

#### Type parameters

| Name |
| :------ |
| `Option` |

#### Type declaration

▸ (`editingValue`): `Option`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `editingValue` | `string` |

##### Returns

`Option`[]

#### Defined in

components/autocomplete-field/index.tsx:216

___

### SelectEventHandler

Ƭ **SelectEventHandler**<`Key`, `Option`\>: (`data`: [`Data`](./Form#data)<`Key`, `Option` \| ``null``\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](./Form#data)<`Key`, `Option` \| ``null``\> |

##### Returns

`void`

#### Defined in

components/autocomplete-field/index.tsx:222
