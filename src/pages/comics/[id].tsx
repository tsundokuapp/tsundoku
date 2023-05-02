import { SectionEntryAnimation } from "@/animations/SectionEntry";
import { TsunAccordion } from "@/components/Accordion";
import { LayoutObraIndiceGeral } from "@/components/Layouts/ObraIndiceGeral";
import { defaultMangas } from "@/constants/WorksDetails";
import { useRouter } from "next/router";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars

  const router = useRouter();
  const { id } = router.query;

  const currentWork = defaultMangas.find((item) => item.id === id);
  return (
    <>
      {currentWork ? (
        <LayoutObraIndiceGeral
          titleWeb={currentWork.titleWork}
          titleWork={currentWork.titleWork}
          titleWorkAlternative={currentWork.titleWorkAlternative}
          hrefCover={currentWork.hrefCover}
          altCover={currentWork.altCover}
          genres={currentWork.genres}
          author={currentWork.author}
          illustrator={currentWork.illustrator}
          status={currentWork.status}
          type={currentWork.type}
          synopsis={currentWork.synopsis}
        >
          <SectionEntryAnimation delay={true}>
            <TsunAccordion />
          </SectionEntryAnimation>
        </LayoutObraIndiceGeral>
      ) : (
        <>
          <h1>Falha ao carregar os dados</h1>
        </>
      )}
    </>
  );
}
