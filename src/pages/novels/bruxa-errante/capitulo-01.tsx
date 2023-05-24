import { LayoutCapituloNovel } from "@/components/Layouts/CapituloNovel";
import { Section } from "@/components/Section";
import { Warning } from "@/components/Warning";
import { useState } from "react";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutCapituloNovel titulo="Bruxa Errante - Tsundoku">
      <Section>
        {temAviso && (
          <Warning
            important={true}
            message="Bruxa Errante: A Jornada de Elaina recebeu uma adaptação para anime em 2020."
          />
        )}
      </Section>
    </LayoutCapituloNovel>
  );
}
