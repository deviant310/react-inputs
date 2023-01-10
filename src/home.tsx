/**
 * Dev-server entrypoint
 */

import { forwardRef, useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';

import { MaskedField, NumberField, SelectField, TextField } from './index';

type Option = {
  id: number;
  value: string;
};

const Form = () => {
  const [phoneMask, setPhoneMask] = useState('+7 ### ###-##-##');
  const [cardMask] = useState('####-####-####-####');
  const [phoneSource, setPhoneSource] = useState(String.raw`\+7|(\d)`);
  const [cardSource] = useState(String.raw`(\d)`);
  const [name, setName] = useState('Anton');
  const [lastName, setLastName] = useState('Lebedev');
  const [age, setAge] = useState(30);
  const [salary, setSalary] = useState(300);
  const [country, setCountry] = useState<Option | null>(countries[0]);
  const [movie, setMovie] = useState<Option | null>(movies[0]);
  const [phone, setPhone] = useState('9');
  const [card, setCard] = useState('12345678');

  useEffect(() => console.log(phone), [phone]);

  return (
    <>
      <fieldset>
        <TextField
          inputComponent={TextFieldInput}
          name="name"
          setValue={setName}
          value={name}
        />

        <TextField
          name="lastName"
          setValue={setLastName}
          value={lastName}
        />
      </fieldset>

      <fieldset>
        <NumberField
          min={1}
          name="age"
          setValue={setAge}
          value={age}
        />

        <NumberField
          min={0}
          name="salary"
          setValue={setSalary}
          value={salary}
        />
      </fieldset>

      <fieldset>
        <SelectField
          containerComponent={SelectFieldContainer}
          displayStringForOption={getOptionValue}
          dropdownComponent={SelectFieldDropdown}
          getOptionKey={getOptionId}
          inputComponent={SelectFieldInput}
          label="Country"
          name="country"
          optionComponent={SelectFieldOption}
          optionsBuilder={optionsBuilder.bind(countries)}
          setValue={setCountry}
          value={country}
        />

        <SelectField
          containerComponent={SelectFieldContainer}
          displayStringForOption={getOptionValue}
          dropdownComponent={SelectFieldDropdown}
          getOptionKey={getOptionId}
          inputComponent={SelectFieldInput}
          label="Movie"
          name="movie"
          optionComponent={SelectFieldOption}
          optionsBuilder={optionsBuilder.bind(movies)}
          setValue={setMovie}
          value={movie}
        />
      </fieldset>

      <fieldset>
        <MaskedField
          inputComponent={PhoneInput}
          mask={phoneMask}
          name="phone"
          setValue={setPhone}
          source={phoneSource}
          value={phone}
        />

        <MaskedField
          inputComponent={PhoneInput}
          mask={cardMask}
          name="card"
          setValue={setCard}
          source={cardSource}
          value={card}
        />
      </fieldset>

      <button
        onClick={() => {
          setPhoneMask('+995 ### ###-###');

          setPhoneSource(String.raw`\+995|(\d)`);

          setPhone('5');
        }}>
        Change Mask
      </button>
    </>
  );
};

const SelectFieldContainer: SelectField.ContainerComponent = props => (
  <span style={{ position: 'relative' }} {...props} />
);

const SelectFieldDropdown: SelectField.DropdownComponent = props => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid grey',
      left: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 9999
    }}
    {...props}
  />
);

const countries: Option[] = [
  { id: 1, value: 'Cyprus' },
  { id: 2, value: 'Georgia' }
];

const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' }
];

const SelectFieldInput: SelectField.InputComponent = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

const SelectFieldOption: SelectField.OptionComponent<Option> = ({ data, ...props }) => (
  <div {...props}>{data.value}</div>
);

const TextFieldInput = (props: TextField.InputProps) => (
  <input {...props} />
);

function optionsBuilder (this: Option[], editingValue: string) {
  return this
    .filter(
      option => option.value
        .toLowerCase()
        .includes(
          editingValue.toLowerCase()
        )
    );
}

const getOptionId = (option: Option) => option.id;
const getOptionValue = (option: Option) => option.value;

const PhoneInput: MaskedField.InputComponent = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<Form />);
