import React, { useState, Dispatch, SetStateAction } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import {
  ArrowDropDown,
  Brightness2,
  Brightness4,
  Brightness7,
} from "@material-ui/icons";
import { DefaultTheme } from "styled-components";
import { light, dark, sepia } from "styles/themes";

interface IDropDownTemas {
  opcoes: {
    indiceTema: string;
    icone: JSX.Element;
  }[];
  temaSelecionado: JSX.Element;
  setTemaSelecionado: Dispatch<SetStateAction<JSX.Element>>;
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
}

const DropDownTemas: React.FC<IDropDownTemas> = ({
  opcoes,
  temaSelecionado,
  setTemaSelecionado,
  setTheme,
}) => {
  const [ativo, setAtivo] = useState(false);

  const alteraTemaIncone = (tema: string) => {
    if (tema === "dark") {
      setTemaSelecionado(<Brightness2 />);
      setTheme(dark);
    }

    if (tema === "light") {
      setTemaSelecionado(<Brightness7  />);
      setTheme(light);
    }

    if (tema === "sepia") {
      setTemaSelecionado(<Brightness4 />);
      setTheme(sepia);
    }
  };

  return (
    <Dropdown>
      <DropdownBtn onClick={(e) => setAtivo(!ativo)}>
        {temaSelecionado}
        <ArrowDropDown />
      </DropdownBtn>
      {ativo && (
        <DropdownConteudo>
          {opcoes.map((opcao) => (
            <DropdownItem
              key={opcao.indiceTema}
              onClick={(e) => {
                alteraTemaIncone(opcao.indiceTema);
                setAtivo(false);
              }}
            >
              {opcao.icone}
            </DropdownItem>
          ))}
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropDownTemas;
