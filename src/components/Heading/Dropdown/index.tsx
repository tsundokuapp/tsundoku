import React, { useState } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import { useTheme } from "@/hooks/useThemeContext";

const DropdownTemas = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <Dropdown>
      <DropdownBtn onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        {theme.icon as React.ReactNode}
      </DropdownBtn>

      {dropdownIsOpen && (
        <DropdownConteudo onMouseLeave={() => setDropdownIsOpen(false)}>
          <DropdownItem
            onClick={() => {
              handleThemeChange();
              setDropdownIsOpen(false);
            }}
          >
            {theme.icon as React.ReactNode}
          </DropdownItem>
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropdownTemas;
