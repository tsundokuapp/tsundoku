import { LayoutListagemObra } from "@/components/Layouts/ObraListagem";
import { BoxAviso } from "@/styles/Home/styles";
import { Secao } from "@/components/Secao";
import { useState } from "react";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutListagemObra titulo="Novels - Tsundoku">
      <Secao>
        {temAviso && (
          <BoxAviso>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Secao>
    </LayoutListagemObra>
  );
}
