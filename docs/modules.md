[React Form - v1.0.0](README.md) / Exports

# React Form - v1.0.0

## Table of contents

### Namespaces

- [AutocompleteField](modules/AutocompleteField.md)
- [Form](modules/Form.md)
- [MaskedField](modules/MaskedField.md)
- [NumberField](modules/NumberField.md)
- [TextField](modules/TextField.md)

### Functions

- [AutocompleteField](modules.md#autocompletefield)
- [MaskedField](modules.md#maskedfield)
- [NumberField](modules.md#numberfield)
- [TextField](modules.md#textfield)
- [useForm](modules.md#useform)

## Functions

### AutocompleteField

▸ **AutocompleteField**<`Key`, `Option`\>(`props`): `Element`

Autocomplete field

```
import { AutocompleteField } from 'react-form';

type Country = { id: number; value: string; }

const countries: Country[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const CountryOption = ({ data, ...props }: AutocompleteField.OptionProps<Country>) => (
  <div {...props}>{data.title}</div>
);

function Form () {
  return (
    <AutocompleteField
      name="country"
      selected={countries[1]}
      optionsBuilder={editingValue => (
        countries.filter(option => option.value.includes(editingValue))
      )}
      getOptionKey={option => option.id}
      displayValueForOption={option => option.value}
      optionComponent={CountryOption}
    />
  );
}
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](interfaces/AutocompleteField.Props.md)<`Key`, `Option`\> |

#### Returns

`Element`

#### Defined in

components/autocomplete-field/index.tsx:52

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
| `props` | [`Props`](interfaces/MaskedField.Props.md)<`Name`, `Value`\> |

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
| `props` | [`Props`](interfaces/NumberField.Props.md)<`Name`, `Value`\> |

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
| `props` | [`Props`](interfaces/TextField.Props.md)<`Name`, `Value`\> |

#### Returns

`Element`

#### Defined in

components/text-field.tsx:9

___

### useForm

▸ **useForm**<`Data`\>(`initialData`): [`Data`, `Dispatch`<`Exclude`<{ [K in string \| number \| symbol]: Pick<Data, K\> }[keyof `Data`], `undefined`\>\>]

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
| `Data` | extends [`Data`](modules/Form.md#data)<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialData` | `Data` |

#### Returns

[`Data`, `Dispatch`<`Exclude`<{ [K in string \| number \| symbol]: Pick<Data, K\> }[keyof `Data`], `undefined`\>\>]

#### Defined in

hooks/use-form.ts:22
