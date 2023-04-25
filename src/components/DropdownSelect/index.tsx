import { useState } from "react";
import {
  DropdownItem,
  DropdownStyle,
  SelectContainer,
  SelectLabelButton,
} from "./styles";
import { FaChevronDown } from "react-icons/fa";

interface DropdownSelectProps {
  label: string;
  values: string[];
  onChange: (value: string) => void;
}

export const DropdownSelect = ({
  label,
  values,
  onChange,
}: DropdownSelectProps) => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value: string) => {
    setCurrentValue(value);
  };
  const handleChange = (value: string) => {
    handleValueChange(value);
    if (onChange) onChange(value);
    handleClose();
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={handleOpen}>
        {currentValue !== "" ? (
          <>
            <p>{currentValue}</p> <FaChevronDown />{" "}
          </>
        ) : (
          <>
            <p>{label}</p> <FaChevronDown />
          </>
        )}
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        {values?.map((value, i) => (
          <DropdownItem
            onClick={() => handleChange(value)}
            active={value === currentValue}
            key={i}
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </SelectContainer>
  );
};
