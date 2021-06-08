import React from "react";
import { LogoTemaContainer } from "./style";

import LogoDark from "../../assets/img/logoTemaDark.svg";
import LogoLight from "../../assets/img/logoTemaLight.svg";
import LogoSepia from "../../assets/img/logoTemaSepia.svg";

interface ILogoTemaProps {
  tema: string;
}

const LogoTema: React.FC<ILogoTemaProps> = ({ tema }) => {
 
  var tipoLogo = "";
  var textoAlt = "";

  switch (tema) {
    case "dark":
      tipoLogo = LogoDark;
      textoAlt = "Logo Tsundoku Dark";
      break;
    case "ligth":
      tipoLogo = LogoLight;
      textoAlt = "Logo Tsundoku Light";
      break;
    case "sepia":
      tipoLogo = LogoSepia;
      textoAlt = "Logo Tsundoku Sepia";
      break;

    default:
      break;
  }

  return <LogoTemaContainer src={tipoLogo} alt={textoAlt} />;
};

export default LogoTema;
