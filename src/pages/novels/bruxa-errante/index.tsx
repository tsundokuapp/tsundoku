import { LayoutObraIndice } from "@/components/Layouts/ObraIndice";
import { LayoutObraIndiceMobile } from "@/components/Layouts/Mobile/ObraIndice";
import { Section } from "@/components/Section";
import { useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/breakingPoints";
import { Warning } from "@/components/Warning";

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
              <Warning
                important={true}
                message="Bruxa Errante: A Jornada de Elaina recebeu uma adaptação para anime em 2020."
              />
            )}
          </Section>
        </LayoutObraIndice>
      ) : (
        <LayoutObraIndiceMobile titulo="Bruxa Errante">
          <Section>
            {temAviso && (
              <Warning
                important={true}
                message="Bruxa Errante: A Jornada de Elaina recebeu uma adaptação para anime em 2020."
              />
            )}
          </Section>
        </LayoutObraIndiceMobile>
      )}
    </>
  );
}
