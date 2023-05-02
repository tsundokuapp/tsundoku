import { useState } from "react";

import { LayoutMangaChapter } from "@/components/Layouts/MangaChapter";
import { BoxAviso } from "@/styles/Home/styles";
import { Section } from "@/components/Section";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutMangaChapter title="Bruxa Errante - Tsundoku">
      <Section>
        {temAviso && (
          <BoxAviso>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Section>
    </LayoutMangaChapter>
  );
}
