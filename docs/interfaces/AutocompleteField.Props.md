[React Form - v1.0.0](../README.md) / [Exports](../modules.md) / [AutocompleteField](../modules/AutocompleteField.md) / Props

# Interface: Props<Key, Option\>

[AutocompleteField](../modules/AutocompleteField.md).Props

## Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |
| `Option` | `Option` |

## Hierarchy

- [`FieldProps`](Form.FieldProps.md)<`Key`\>

  ↳ **`Props`**

## Table of contents

### Properties

- [containerComponent](AutocompleteField.Props.md#containercomponent)
- [displayValueForOption](AutocompleteField.Props.md#displayvalueforoption)
- [dropdownComponent](AutocompleteField.Props.md#dropdowncomponent)
- [getOptionKey](AutocompleteField.Props.md#getoptionkey)
- [inputComponent](AutocompleteField.Props.md#inputcomponent)
- [label](AutocompleteField.Props.md#label)
- [name](AutocompleteField.Props.md#name)
- [onSelect](AutocompleteField.Props.md#onselect)
- [optionComponent](AutocompleteField.Props.md#optioncomponent)
- [optionsBuilder](AutocompleteField.Props.md#optionsbuilder)
- [selected](AutocompleteField.Props.md#selected)

## Properties

### containerComponent

• `Optional` **containerComponent**: `FunctionComponent`<[`ContainerProps`](../modules/AutocompleteField.md#containerprops)\>

#### Defined in

components/autocomplete-field/index.tsx:211

___

### displayValueForOption

• **displayValueForOption**: [`OptionValueExtractor`](../modules/AutocompleteField.md#optionvalueextractor)<`Option`\>

#### Defined in

components/autocomplete-field/index.tsx:195

___

### dropdownComponent

• `Optional` **dropdownComponent**: `FunctionComponent`<[`DropdownProps`](../modules/AutocompleteField.md#dropdownprops)\>

#### Defined in

components/autocomplete-field/index.tsx:212

___

### getOptionKey

• **getOptionKey**: [`OptionKeyExtractor`](../modules/AutocompleteField.md#optionkeyextractor)<`Option`\>

#### Defined in

components/autocomplete-field/index.tsx:194

___

### inputComponent

• `Optional` **inputComponent**: `FunctionComponent`<[`InputProps`](AutocompleteField.InputProps.md)\>

#### Defined in

components/autocomplete-field/index.tsx:213

___

### label

• `Optional` **label**: `string`

#### Inherited from

[FieldProps](Form.FieldProps.md).[label](Form.FieldProps.md#label)

#### Defined in

types/form.ts:12

___

### name

• **name**: `Key`

#### Inherited from

[FieldProps](Form.FieldProps.md).[name](Form.FieldProps.md#name)

#### Defined in

types/form.ts:11

___

### onSelect

• `Optional` **onSelect**: [`SelectEventHandler`](../modules/AutocompleteField.md#selecteventhandler)<`Key`, `Option`\>

#### Defined in

components/autocomplete-field/index.tsx:210

___

### optionComponent

• **optionComponent**: `FunctionComponent`<[`OptionProps`](../modules/AutocompleteField.md#optionprops)<`Option`\>\>

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

• **optionsBuilder**: [`OptionsBuilder`](../modules/AutocompleteField.md#optionsbuilder)<`Option`\>

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
