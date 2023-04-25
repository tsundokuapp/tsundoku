import { LayoutCapituloNovel } from "@/components/Layouts/CapituloNovel";
import { BoxAviso } from "@/styles/Home/styles";
import { Secao } from "@/components/Secao";
import { useState } from "react";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutCapituloNovel titulo="Bruxa Errante - Tsundoku">
      <Secao>
        {temAviso && (
          <BoxAviso>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Secao>
    </LayoutCapituloNovel>
  );
}
