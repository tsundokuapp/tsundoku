import Link from "next/link";
import React, { useState } from "react";
import Container, {ItemLista, ListaMenu, ListaSubMenu, ItemSubLista} from "./styles";
import { ROTAS } from "@/constants/rotas";


const NavMenuAside = () => {
  
  const [subMenuAtivo, setSubMenuAtivo] = useState(false);

  const ativaDesativaMenu = (event: any) => {
    var evento = event.this;

    if (evento === undefined) {
      setSubMenuAtivo(!subMenuAtivo);
    }
  };

  return (
    <Container>
      <ListaMenu>
        <ItemLista>         
          <Link href={ROTAS.DASHBOARD}>
            Dashboard
          </Link>
        </ItemLista>
       <ItemLista className="ativaMenu" onClick={ativaDesativaMenu}>          
            <a>Obras</a>                    
            <ListaSubMenu> 
              <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
                <Link href={ROTAS.OBRAS}>
                  Ver Obras
                </Link>
              </ItemSubLista>
              <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
                <Link href={ROTAS.ADICIONAR_OBRA}>
                  Nova Obra
                </Link>
              </ItemSubLista>              
            </ListaSubMenu>        
        </ItemLista>
        <ItemLista>          
          <Link href={ROTAS.USUARIOS}>
            Usuários
          </Link>
        </ItemLista>
      </ListaMenu>
    </Container>
  );
};

export default NavMenuAside;
