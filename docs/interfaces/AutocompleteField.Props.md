[AutocompleteField](../modules/AutocompleteField).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

## Hierarchy

- [`FieldProps`](./Form.FieldProps)<`Key`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [containerComponent](./AutocompleteField.Props#containercomponent)
- [displayValueForOption](./AutocompleteField.Props#displayvalueforoption)
- [dropdownComponent](./AutocompleteField.Props#dropdowncomponent)
- [getOptionKey](./AutocompleteField.Props#getoptionkey)
- [inputComponent](./AutocompleteField.Props#inputcomponent)
- [label](./AutocompleteField.Props#label)
- [name](./AutocompleteField.Props#name)
- [onSelect](./AutocompleteField.Props#onselect)
- [optionComponent](./AutocompleteField.Props#optioncomponent)
- [optionsBuilder](./AutocompleteField.Props#optionsbuilder)
- [selected](./AutocompleteField.Props#selected)

## Properties

### containerComponent

• `Optional` **containerComponent**: `FunctionComponent`<[`ContainerProps`](../modules/AutocompleteField#containerprops)\>

#### Defined in

components/autocomplete-field/index.tsx:211

___

### displayValueForOption

• **displayValueForOption**: [`OptionValueExtractor`](../modules/AutocompleteField#optionvalueextractor)<`Option`\>

#### Defined in

components/autocomplete-field/index.tsx:195

___

### dropdownComponent

• `Optional` **dropdownComponent**: `FunctionComponent`<[`DropdownProps`](../modules/AutocompleteField#dropdownprops)\>

#### Defined in

components/autocomplete-field/index.tsx:212

___

### getOptionKey

• **getOptionKey**: [`OptionKeyExtractor`](../modules/AutocompleteField#optionkeyextractor)<`Option`\>

#### Defined in

components/autocomplete-field/index.tsx:194

___

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](./AutocompleteField.InputProps)\>

#### Defined in

components/autocomplete-field/index.tsx:213

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](./Form.FieldProps).[label](./Form.FieldProps#label)

#### Defined in

types/form.ts:12

___

### name

• **name**: `Key`

#### Inherited from

[FieldProps](./Form.FieldProps).[name](./Form.FieldProps#name)

#### Defined in

types/form.ts:11

___

### onSelect

• `Optional` **onSelect**: [`SelectEventHandler`](../modules/AutocompleteField#selecteventhandler)<`Key`, `Option`\>

#### Defined in

components/autocomplete-field/index.tsx:210

___

### optionComponent

• **optionComponent**: `FunctionComponent`<[`OptionProps`](../modules/AutocompleteField#optionprops)<`Option`\>\>

Option function component

**`Example`**

```
type Country = { id: number; value: string; }

function CountryOption ({ data, ...props }: AutocompleteField.OptionProps<Country>) {
  return <div {...props}>{data.title}</div>;
}
```

#### Defined in

components/autocomplete-field/index.tsx:208

___

### optionsBuilder

• **optionsBuilder**: [`OptionsBuilder`](../modules/AutocompleteField#optionsbuilder)<`Option`\>

Build options array depending on editing value

**`Example`**

```
const countries = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

function optionsBuilder (editingValue: string) {
  return countries.filter(({ value })) => value.includes(editingValue));
}
```

#### Defined in

components/autocomplete-field/index.tsx:193

___

### selected

• `Optional` **selected**: ``null`` \| `Option`

#### Defined in

components/autocomplete-field/index.tsx:209
