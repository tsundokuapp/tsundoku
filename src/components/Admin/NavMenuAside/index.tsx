import Link from "next/link";
import React, { useState } from "react";
import Container, {ItemLista, ListaMenu, ListaSubMenu, ItemSubLista} from "./styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { ROTAS } from "../../../constants/rotas";


const NavMenuAside = () => {
  
  const [subMenuAtivo, setSubMenuAtivo] = useState(false);

  const ativaDesativaMenu = (event: any) => {
    var evento = event.this;

    if (evento === undefined) {
      setSubMenuAtivo(!subMenuAtivo);
    }
  };

  // TODO: Criar um componente link pass

  return (
    <Container>
      <ListaMenu>
        <ItemLista>
          <DashboardIcon />
          <Link href={ROTAS.DASHBOARD}>
            Dashboard
          </Link>
        </ItemLista>
       <ItemLista className="ativaMenu" onClick={ativaDesativaMenu}>
          <LibraryBooksIcon />
            <a>Obras</a>                    
            <ListaSubMenu> 
              <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
                <Link href={ROTAS.OBRAS}>
                  Ver Obras
                </Link>
              </ItemSubLista>
              <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
                <Link href={ROTAS.NOVAOBRA}>
                  Nova Obra
                </Link>
              </ItemSubLista>              
            </ListaSubMenu>        
        </ItemLista>
        <ItemLista>
          <SupervisorAccountIcon />
          <Link href={ROTAS.USUARIOS}>
            Usuários
          </Link>
        </ItemLista>
      </ListaMenu>
    </Container>
  );
};

export default NavMenuAside;
