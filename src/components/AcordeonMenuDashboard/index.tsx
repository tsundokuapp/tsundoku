import Link from "next/link";
import React, { useState } from "react";
import Container, { Titulo, Conteudo } from "./styles";

interface IAcordeonMenuDashboard {
  //indice: string;
  titulo: string;
  subMenus: {
    descricao: string;
    link: string;
  }[];
}

const AcordeonMenuDashboard: React.FC<IAcordeonMenuDashboard> = ({
  titulo,
  subMenus,
}) => {
  
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Titulo onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
        <div>{isActive ? "-" : "+"}</div>
      </Titulo>
      {isActive && (
        <Conteudo>
          {subMenus.map((menu) => (
            <Link href={menu.link}>
                <a>{menu.descricao}</a>
            </Link>
          ))}
        </Conteudo>
      )}
    </Container>
  );
};

export default AcordeonMenuDashboard;
