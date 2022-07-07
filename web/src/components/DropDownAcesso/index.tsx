import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, DropdownBtn, DropdownConteudo, DropdownItem } from "./style";
import { AccountCircle } from "@material-ui/icons";
import * as ROTAS from "constants/rotas";

const DropDownAcesso: React.FC = () => {
  const [ativo, setAtivo] = useState(false);
  const urlBaseUsuarios = '../../../../usuarios/';  
  const urlBaseAcesso = '../../../../admin/';  

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
            <Link href={urlBaseUsuarios + "login"} >
                <a>Login</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setAtivo(false);
            }}            
          >
            <Link href={urlBaseUsuarios + "cadastro"}>
                <a>Cadastre-se</a>
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setAtivo(false);
            }}            
          >
            <Link href={ROTAS.DASHBOARD}>
                <a>Painel</a>
            </Link>
          </DropdownItem>
        </DropdownConteudo>
      )}
    </Dropdown>
  );
};

export default DropDownAcesso;
