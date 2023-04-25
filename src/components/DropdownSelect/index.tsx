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
  const [valorAtual, setValorAtual] = useState<string>("");
  const [aberto, setAberto] = useState<boolean>(false);

  const toggleMenu = () => {
    setAberto(!aberto);
  };

  const atualizaValor = (value: string) => {
    setValorAtual(value);
  };

  const handleChange = (value: string) => {
    atualizaValor(value);
    if (onChange) onChange(value);
    toggleMenu();
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={toggleMenu}>
        {valorAtual !== "" ? (
          <>
            <p>{valorAtual}</p> <FaChevronDown />{" "}
          </>
        ) : (
          <>
            <p>{label}</p> <FaChevronDown />
          </>
        )}
      </SelectLabelButton>
      <DropdownStyle isVisible={aberto}>
        {values.map((value, i) => (
          <DropdownItem
            onClick={() => handleChange(value)}
            active={value === valorAtual}
            key={i}
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </SelectContainer>
  );
};
