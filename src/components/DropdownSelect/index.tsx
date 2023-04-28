import { useState } from "react";
import {
  DropdownItem,
  DropdownStyle,
  SelectContainer,
  SelectLabelButton,
} from "./styles";
import { FaChevronDown } from "react-icons/fa";

interface IDropdownSelectProps {
  label: string;
  values: string[];
  onChange: (value: string) => void;
}

export const DropdownSelect = ({
  label,
  values,
  onChange,
}: IDropdownSelectProps) => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const attValue = (value: string) => {
    setCurrentValue(value);
  };

  const handleChange = (value: string) => {
    attValue(value);
    if (onChange) onChange(value);
    toggleMenu();
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={toggleMenu}>
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
      <DropdownStyle isVisible={isOpen}>
        {values.map((value, i) => (
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
