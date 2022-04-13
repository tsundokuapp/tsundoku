import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import { AccountCircle } from "@material-ui/icons";

const DropDownAcesso: React.FC = () => {
  const [ativo, setAtivo] = useState(false);

  /*onClick={() => setAtivo(!ativo)}*/

  return (
    <Dropdown>
      <DropdownBtn onClick={() => setAtivo(!ativo)}>
        <AccountCircle />
      </DropdownBtn>
      {ativo && (
        <DropdownConteudo onMouseLeave={() => setAtivo(false)}>
          <DropdownItem
            onClick={() => {
              setAtivo(false);
            }}
            
          >
            <Link href="../../admin/login">
                <a>Login</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setAtivo(false);
            }}            
          >
            <Link href="../../admin/cadastro">
                <a>Cadastre-se</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setAtivo(false);
            }}            
          >
            <Link href="../../admin/dashboard">
                <a>Painel</a>
            </Link>
          </DropdownItem>
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropDownAcesso;
