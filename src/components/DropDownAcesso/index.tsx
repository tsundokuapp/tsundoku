import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import { ExpandMore, AccountCircle } from "@material-ui/icons";

const DropDownAcesso: React.FC = () => {
  const [ativo, setAtivo] = useState(false);

  return (
    <Dropdown>
      <DropdownBtn onClick={(e) => setAtivo(!ativo)}>
        <AccountCircle />
        <ExpandMore />
      </DropdownBtn>
      {ativo && (
        <DropdownConteudo>
          <DropdownItem
            onClick={(e) => {
              setAtivo(false);
            }}
          >
            <Link href="../../admin/login">Login</Link>
          </DropdownItem>
          <DropdownItem
            onClick={(e) => {
              setAtivo(false);
            }}
          >
            <Link href="../../admin/cadastro">Cadastre-se</Link>
          </DropdownItem>
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropDownAcesso;
