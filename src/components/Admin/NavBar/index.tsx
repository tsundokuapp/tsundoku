import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";

import { DefaultTheme } from "styled-components";
import { Container, ContainerMenuUsuario } from "./styles";

interface INavbarProps {
  tema: string | null;
  opcoes: { indiceTema: string; icone: JSX.Element }[];
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
}

const Navbar = ({ tema, opcoes, setTheme }: INavbarProps) => {

  return (
    <Container>
      <Link href="/">
        Tema
      </Link>
      <ContainerMenuUsuario />
    </Container>
  );
};

export default Navbar;
