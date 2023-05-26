import { useState } from "react";

import { LayoutMangaChapter } from "@/components/Layouts/MangaChapter";
import { Section } from "@/components/Section";

export default function ComicChapter() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutMangaChapter title="Bruxa Errante - Tsundoku">
      <Section>teste</Section>
    </LayoutMangaChapter>
  );
}
