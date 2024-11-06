import { forwardRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { MaskedInputTextboxComponent, TextInput } from "../src";
import { TextInputTextboxComponent } from "../src/text-input/types";

import { SelectField } from "./select-field";

const Index = () => {
  const [phone, setPhone] = useState("");
  const [phoneMask, setPhoneMask] = useState("+0");
  const [card, setCard] = useState("");
  const [cardMask] = useState("0000-0000-0000-0000");
  const [name, setName] = useState("Anton");
  const [lastName, setLastName] = useState("Lebedev");
  const [age, setAge] = useState(30);
  const [salary, setSalary] = useState(300);

  //const [movie, setMovie] = useState<Option | null>(movies[0]);

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

      <SelectField />

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

/* const movies: Option[] = [
  { id: 1, value: 'Home Alone' },
  { id: 2, value: 'From Dusk till Dawn' },
]; */

const NameInput: TextInputTextboxComponent = props => <input {...props} />;

const PhoneInput: MaskedInputTextboxComponent = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<Index />);
