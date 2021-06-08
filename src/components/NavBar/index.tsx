import React from "react";
import {Container} from "./styles";
import SelectInputTemas from "../../components/SelectInputTemas";
import LogoTema from "../LogoTema";

interface INavbarProps {
    tema: string,
    options: {
      value:string;
      label:string;
    }[],
    onChange(event: React.ChangeEvent<HTMLSelectElement>) : void | undefined
  }

const Navbar: React.FC<INavbarProps> = ({ tema, options , onChange }) => {   

  return (
    <Container>
      <LogoTema tema={tema} />
      <SelectInputTemas
        options={options}
        onChange={onChange}
      />
      <h2>Login</h2>
    </Container>
  );
};

export default Navbar;
