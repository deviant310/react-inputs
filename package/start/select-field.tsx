import { forwardRef, useMemo, useState } from "react";

import {
  SelectInput,
  SelectInputContainerComponent,
  SelectInputDropdownComponent,
  SelectInputOptionProps,
  SelectInputTextboxComponent,
  SelectInputValue,
} from "../src";

export const SelectField = () => {
  const [textboxValue, setTextboxValue] = useState("");
  const [option, setOption] = useState<SelectInputValue<Option>>(options[0]);

  const optionsFiltered = useMemo(
    () => options.filter(({ value }) => value.includes(textboxValue)),
    [textboxValue],
  );

  return (
    <fieldset>
      <SelectInput
        containerComponent={SelectInputContainer}
        displayStringForOption={getOptionValue}
        dropdownComponent={SelectInputDropdown}
        dropdownIsVisibleByDefault
        getOptionKey={getOptionId}
        label="Country"
        name="country"
        onTextboxValueChange={setTextboxValue}
        optionComponent={SelectInputOption}
        options={optionsFiltered}
        setValue={setOption}
        textboxComponent={SelectInputTextbox}
        value={option}
      />
    </fieldset>
  );
};

interface Option {
  id: number;
  value: string;
}

const options: Option[] = [...Array(300).keys()].map(id => ({
  id,
  value: `Option ${id}`,
}));

const SelectInputContainer: SelectInputContainerComponent = props => (
  <span style={{ position: "relative" }} {...props} />
);

const SelectInputDropdown: SelectInputDropdownComponent = props => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid grey",
      left: 0,
      maxHeight: "500px",
      overflow: "auto",
      position: "absolute",
      width: "100%",
      zIndex: 9999,
    }}
    {...props}
  />
);

const SelectInputOption = forwardRef<
  HTMLDivElement,
  SelectInputOptionProps<Option>
>(({ data, ...props }, ref) => (
  <div {...props} ref={ref}>
    <div style={{ lineHeight: "20px", padding: "10px" }}>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "space-between",
        }}
      >
        <span>{data.value}</span>

        <span>{data.id}</span>
      </div>
    </div>
  </div>
));

const SelectInputTextbox: SelectInputTextboxComponent = props => (
  <input {...props} />
);

const getOptionId = (option: Option) => option.id;
const getOptionValue = (option: Option) => option.value;
