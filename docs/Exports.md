# React Form - v1.0.0

## Table of contents

### Namespaces

- [AutocompleteField](../wiki/AutocompleteField)
- [Form](../wiki/Form)
- [MaskedField](../wiki/MaskedField)
- [NumberField](../wiki/NumberField)
- [TextField](../wiki/TextField)

### Functions

- [AutocompleteField](../wiki/Exports#autocompletefield)
- [MaskedField](../wiki/Exports#maskedfield)
- [NumberField](../wiki/Exports#numberfield)
- [TextField](../wiki/Exports#textfield)
- [useForm](../wiki/Exports#useform)

## Functions

### AutocompleteField

▸ **AutocompleteField**<`Key`, `Option`\>(`props`): `Element`

AutocompleteField component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](../wiki/AutocompleteField.Props)<`Key`, `Option`\> |

#### Returns

`Element`

#### Defined in

components/autocomplete-field/index.tsx:21

___

### MaskedField

▸ **MaskedField**<`Name`, `Value`\>(`props`): `Element`

MaskedField component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](../wiki/MaskedField.Props)<`Name`, `Value`\> |

#### Returns

`Element`

#### Defined in

components/masked-field/index.tsx:23

___

### NumberField

▸ **NumberField**<`Name`, `Value`\>(`props`): `Element`

NumberField memo component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](../wiki/NumberField.Props)<`Name`, `Value`\> |

#### Returns

`Element`

#### Defined in

components/number-field.tsx:14

___

### TextField

▸ **TextField**<`Name`, `Value`\>(`props`): `Element`

TextField memo component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Value` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](../wiki/TextField.Props)<`Name`, `Value`\> |

#### Returns

`Element`

#### Defined in

components/text-field.tsx:9

___

### useForm

▸ **useForm**<`Data`\>(`initialData`): [`Data`, `Dispatch`<`Partial`<`Data`\>\>]

Returns form data and a reducer action to update data key

**`Example`**

```
const [data, setData] = useForm({
  name: 'John',
  surname: 'Doe'
});

return (
  <TextField value={data.name} onChange={setData}/>
);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | extends [`Data`](../wiki/Form#data)<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialData` | `Data` |

#### Returns

[`Data`, `Dispatch`<`Partial`<`Data`\>\>]

#### Defined in

hooks/use-form.ts:22
