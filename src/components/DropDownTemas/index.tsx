import React, { useState, Dispatch, SetStateAction } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import {
    ExpandMore,
    Brightness3,
    Brightness6,
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
      setTemaSelecionado(<Brightness3 />);
      setTheme(dark);
    }

    if (tema === "light") {
      setTemaSelecionado(<Brightness7  />);
      setTheme(light);
    }

    if (tema === "sepia") {
      setTemaSelecionado(<Brightness6 />);
      setTheme(sepia);
    }
  };

  return (
    <Dropdown>
      <DropdownBtn onClick={() => setAtivo(!ativo)}>
        {temaSelecionado}
      </DropdownBtn>
      {ativo && (
        <DropdownConteudo onMouseLeave={() => setAtivo(false)}>
          {opcoes.map((opcao) => (
            <DropdownItem
              key={opcao.indiceTema}
              onClick={() => {
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
