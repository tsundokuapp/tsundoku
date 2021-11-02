import Link from "next/link";
import React, {useState} from "react";
import Container, {
  ItemLista,
  ListaMenu,
  ListaSubMenu,
  ItemSubLista,
} from "./styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import * as ROTAS from 'constants/rotas';

const NavMenuAside: React.FC = () => {
    const [subMenuAtivo, setSubMenuAtivo] = useState(false);

    const ativaDesativaMenu = (event: any) => {
        var evento = event.this;

        if (evento === undefined){
            setSubMenuAtivo(!subMenuAtivo);
        }

        console.log("Elemento: ", evento)
    }

    // criar um componente link e trocar os links

  return (
    <Container>
      <ListaMenu>
        <ItemLista>
          <DashboardIcon />
          {/* <Link href="../../admin/dashboard">Dashboard</Link> */}
          <Link href={ROTAS.DASHBOARD}>
          <a>Dashboard</a>
          </Link>
        </ItemLista>
        <ItemLista className="ativaMenu" onClick={ativaDesativaMenu}>
          <LibraryBooksIcon />
          <a>Obras</a>
          {subMenuAtivo && <ListaSubMenu>
            <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
              {/* <Link href="../../admin/obras">Ver Obras</Link> */}
              <Link href={ROTAS.OBRAS}>
                <a>Ver Obras</a>
              </Link>
            </ItemSubLista>
            <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
              {/* <Link href="../../admin/novaobra">Nova Obra</Link> */}
              <Link href={ROTAS.NOVAOBRA}>
              <a>Nova Obra</a>
          </Link>
            </ItemSubLista>
            <ItemSubLista onClick={() => setSubMenuAtivo(false)}>
              {/* <Link href="../../admin/generos">Ver Gêneros</Link> */}
              <Link href={ROTAS.GENEROS}>
              <a>Ver Gêneros</a>
          </Link>
            </ItemSubLista>
          </ListaSubMenu>}
        </ItemLista>
        <ItemLista>
          <SupervisorAccountIcon />
          {/* <Link href="../../admin/usuarios">Usuários</Link> */}
          <Link href={ROTAS.USUARIOS}>
          <a>Usuários</a>
          </Link>
        </ItemLista>
      </ListaMenu>
    </Container>
  );
};

export default NavMenuAside;
