import { LayoutObraIndice } from "@/components/Layouts/ObraIndice";
import { LayoutObraIndiceMobile } from "@/components/Layouts/Mobile/ObraIndice";
import { Section } from "@/components/Section";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/breakingPoints";
import { Warning } from "@/components/Warning";

export default function Novel() {
  const { width } = useWindowDimensions();

  return (
    <>
      {width > SIZES_RAW.TABLET ? (
        <LayoutObraIndice titulo="Bruxa Errante - Tsundoku">
          <Section>
            <Warning important={true} message="Aviso de teste para mobile" />
          </Section>
        </LayoutObraIndice>
      ) : (
        <LayoutObraIndiceMobile titulo="Bruxa Errante">
          <Section>
            <Warning important={true} message="Aviso de teste para mobile" />
          </Section>
        </LayoutObraIndiceMobile>
      )}
    </>
  );
}
