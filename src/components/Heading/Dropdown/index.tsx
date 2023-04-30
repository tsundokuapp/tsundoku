import { useTheme } from "@/hooks/useThemeContext";
import { useState } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";

const DropdownTemas = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <Dropdown>
      <DropdownBtn onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        <>{theme.icon}</>
      </DropdownBtn>

      {dropdownIsOpen && (
        <DropdownConteudo onMouseLeave={() => setDropdownIsOpen(false)}>
          <DropdownItem
            onClick={() => {
              handleThemeChange();
              setDropdownIsOpen(false);
            }}
          >
            <>{theme.icon}</>
          </DropdownItem>
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropdownTemas;
