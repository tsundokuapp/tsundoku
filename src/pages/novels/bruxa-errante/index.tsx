import { LayoutObraIndice } from "@/components/Layouts/ObraIndice";
import { LayoutObraIndiceMobile } from "@/components/Layouts/Mobile/ObraIndice";
import { BoxAviso } from "@/styles/Home/styles";
import { Section } from "@/components/Section";
import { useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/breakingPoints";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <>
      {width > SIZES_RAW.TABLET ? (
        <LayoutObraIndice titulo="Bruxa Errante - Tsundoku">
          <Section>
            {temAviso && (
              <BoxAviso>
                <h2>AVISO</h2>
                <p>Site em construção, em breve uma nova Tsundoku!</p>
              </BoxAviso>
            )}
          </Section>
        </LayoutObraIndice>
      ) : (
        <LayoutObraIndiceMobile titulo="Bruxa Errante">
          <Section>
            {temAviso && (
              <BoxAviso>
                <h2>AVISO</h2>
                <p>Site em construção, em breve uma nova Tsundoku!</p>
              </BoxAviso>
            )}
          </Section>
        </LayoutObraIndiceMobile>
      )}
    </>
  );
}
