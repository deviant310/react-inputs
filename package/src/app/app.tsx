/**
 * Dev-server entrypoint
 */
import { forwardRef, useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';

import {
  MaskedInput,
  MaskedInputCoreComponent,
  NumberInput,
  SelectInput,
  SelectInputContainerComponent,
  SelectInputDropdownComponent,
  SelectInputOptionComponent,
  SelectInputOptionProps,
  SelectInputTextBoxComponent,
  TextInput,
} from './inputs';

type Option = {
  id: number;
  value: string;
};

const App = () => {
  const [phone, setPhone] = useState('');
  const [phoneMask, setPhoneMask] = useState('+0');
  const [card, setCard] = useState('');
  const [cardMask] = useState('0000-0000-0000-0000');
  const [name, setName] = useState('Anton');
  const [lastName, setLastName] = useState('Lebedev');
  const [age, setAge] = useState(30);
  const [salary, setSalary] = useState(300);
  const [country, setCountry] = useState<Option | null>(countries[0]);
  //const [movie, setMovie] = useState<Option | null>(movies[0]);

  useEffect(() => console.log(country), [country]);

  return (
    <>
      {/*<fieldset>
        <TextInput
          inputComponent={NameInput}
          name="name"
          setValue={setName}
          value={name}
        />

        <TextInput
          name="lastName"
          setValue={setLastName}
          value={lastName}
        />
      </fieldset>*/}

      {/*<fieldset>
        <NumberInput
          min={1}
          name="age"
          setValue={setAge}
          value={age}
        />

        <NumberInput
          min={0}
          name="salary"
          setValue={setSalary}
          value={salary}
        />
      </fieldset>*/}

      <fieldset>
        <SelectInput
          containerComponent={SelectInputContainer}
          displayStringForOption={getOptionValue}
          dropdownComponent={SelectInputDropdown}
          dropdownIsVisibleByDefault
          getOptionKey={getOptionId}
          label="Country"
          name="country"
          optionComponent={SelectInputOption}
          optionsBuilder={optionsBuilder.bind(countries)}
          setValue={setCountry}
          textBoxComponent={CountryTextBox}
          value={country}
        />

        {/*<SelectInput
          containerComponent={SelectInputContainer}
          displayStringForOption={getOptionValue}
          dropdownComponent={SelectInputDropdown}
          getOptionKey={getOptionId}
          inputComponent={SelectInputInput}
          label="Movie"
          name="movie"
          optionComponent={SelectInputOption}
          optionsBuilder={optionsBuilder.bind(movies)}
          setValue={setMovie}
          value={movie}
        />*/}
      </fieldset>

      {/*<fieldset>
        <MaskedInput
          inputComponent={PhoneInput}
          mask={phoneMask}
          name="phone"
          setValue={setPhone}
          value={phone}
        />

        <MaskedInput
          inputComponent={PhoneInput}
          mask={cardMask}
          name="card"
          setValue={setCard}
          value={card}
        />
      </fieldset>*/}

      {/*<button
        onClick={() => {
          setPhoneMask('{+995} 000 000-000');

          setPhone('+995123');
        }}>
        Change Mask
      </button>*/}
    </>
  );
};

const SelectInputContainer: SelectInputContainerComponent = props => (
  <span style={{ position: 'relative' }} {...props} />
);

const SelectInputDropdown: SelectInputDropdownComponent = props => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid grey',
      left: 0,
      maxHeight: '500px',
      overflow: 'auto',
      position: 'absolute',
      width: '100%',
      zIndex: 9999,
    }}
    {...props}
  />
);

const countries: Option[] = [...Array(300).keys()]
  .map(id => ({
    id,
    value: `Country ${id}`,
  }));

/* const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' },
]; */

const CountryTextBox: SelectInputTextBoxComponent = props => (
  <input {...props} />
);

const SelectInputOption = forwardRef<HTMLDivElement, SelectInputOptionProps<Option>>(
  ({ data, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        <div style={{ lineHeight: '20px', padding: '10px' }}>
          <div style={{
            display: 'grid',
            gridAutoFlow: 'column',
            justifyContent: 'space-between',
          }}>
            <span>{data.value}</span>

            <span>{data.id}</span>
          </div>
        </div>
      </div>
    );
  },
);

const NameInput: TextInput.InputComponent = props => (
  <input {...props} />
);

function optionsBuilder (this: Option[], editingValue: string) {
  const options: Option[] = [];
  const limit = this.length;

  for (let index = 0; index < limit; index++) {
    if (this[index].value
      .toLowerCase()
      .includes(
        editingValue.toLowerCase(),
      ))
      options.push(this[index]);
  }

  return options;
}

const getOptionId = (option: Option) => option.id;
const getOptionValue = (option: Option) => option.value;

const PhoneInput: MaskedInputCoreComponent = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);
