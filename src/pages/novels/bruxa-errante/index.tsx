import { useState } from "react";

import { LayoutObraIndiceMobile } from "@/components/Layouts/Mobile/ObraIndice";
import { LayoutObraIndice } from "@/components/Layouts/ObraIndice";
import { Section } from "@/components/Section";
import { Warning } from "@/components/Warning";
import { SIZES_RAW } from "@/constants/breakingPoints";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

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
