react-form - v1.0.0

# react-form - v1.0.0

## Table of contents

### Functions

- [AutocompleteField](README.md#autocompletefield)
- [MaskedField](README.md#maskedfield)
- [NumberField](README.md#numberfield)
- [TextField](README.md#textfield)
- [useForm](README.md#useform)

### Namespaces

- [AutocompleteField](modules/AutocompleteField.md)
- [MaskedField](modules/MaskedField.md)
- [NumberField](modules/NumberField.md)
- [TextField](modules/TextField.md)

### Type Aliases

- [AbstractData](README.md#abstractdata)

### Interfaces

- [FieldProps](interfaces/FieldProps.md)
- [FieldChangeEvent](interfaces/FieldChangeEvent.md)

## Functions

### AutocompleteField

▸ **AutocompleteField**<`Name`, `Option`\>(`props`): `Element`

A component for helping the user make a selection by entering some text and choosing from among a list of options.

The user's text input is received by [displayValueForOption](interfaces/AutocompleteField.Props.md#displayvalueforoption) parameter.
The options to be displayed are determined using [optionsBuilder](interfaces/AutocompleteField.Props.md#optionsbuilder)
and rendered with [optionComponent](interfaces/AutocompleteField.Props.md#optioncomponent).

**`Example`**

```tsx
import { AutocompleteField } from 'react-form';

type Option = {
  id: number;
  value: string;
};

export const Form = () => (
  <AutocompleteField
    displayValueForOption={getOptionValue}
    getOptionKey={getOptionKey}
    name="country"
    optionComponent={CountryOption}
    optionsBuilder={optionsBuilder}
  />
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const getOptionValue = (option: Option) => option.value;
const getOptionKey = (option: Option) => option.id;

const CountryOption = ({ data, ...props }: AutocompleteField.OptionProps<Option>) => (
  <div {...props}>{data.value}</div>
);

const optionsBuilder = (editingValue: string) => {
  return countries
    .filter(
      option => option.value
        .toLowerCase()
        .includes(
          editingValue.toLowerCase()
        )
    );
};

```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Option` | `Option` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](interfaces/AutocompleteField.Props.md)<`Name`, `Option`\> |

#### Returns

`Element`

___

### MaskedField

▸ **MaskedField**<`Name`\>(`props`): `Element`

A component for helping the user entering some text by configured mask.

Input pattern is determined by [mask](interfaces/MaskedField.Props.md#mask) parameter.
The user's text input is controlled by [source](interfaces/MaskedField.Props.md#source) parameter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](interfaces/MaskedField.Props.md)<`Name`\> |

#### Returns

`Element`

___

### NumberField

▸ **NumberField**<`Name`\>(`props`): `Element`

Number field component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](interfaces/NumberField.Props.md)<`Name`\> |

#### Returns

`Element`

___

### TextField

▸ **TextField**<`Name`\>(`props`): `Element`

Text field component

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](interfaces/TextField.Props.md)<`Name`\> |

#### Returns

`Element`

___

### useForm

▸ **useForm**<`Data`\>(`initialData`): [`Data`, `Dispatch`<`Exclude`<{ [K in string \| number \| symbol]: Pick<Data, K\> }[keyof `Data`], `undefined`\>\>]

Returns form data and a reducer action to update data key

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
| `Data` | extends [`AbstractData`](README.md#abstractdata) = [`AbstractData`](README.md#abstractdata) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialData` | `Data` |

#### Returns

[`Data`, `Dispatch`<`Exclude`<{ [K in string \| number \| symbol]: Pick<Data, K\> }[keyof `Data`], `undefined`\>\>]

## Type Aliases

### AbstractData

Ƭ **AbstractData**: `Record`<`string`, `unknown`\>

Abstract form data interface
