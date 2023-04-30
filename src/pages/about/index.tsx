import { LayoutMain } from "@/components/Layouts/Main";
import { Carousel } from "@/components/Carousel";
import { BoxAviso } from "@/styles/Home/styles";
import { useState } from "react";

import { Section } from "@/components/Section";

export default function Home() {
  const [temAviso, setTemAviso] = useState(true);

  // TODO: Função temporária
  const desativaAviso = () => {
    setTemAviso(false);
  };

  return (
    <LayoutMain title="Tsundoku Traduções">
      <Section>
        <Carousel />
        {temAviso && (
          <BoxAviso onClick={desativaAviso}>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Section>
    </LayoutMain>
  );
}
