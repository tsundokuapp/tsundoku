import { useWarn } from "@/Context/ContextWarning";
import { SectionEntryAnimation } from "@/animations/SectionEntry";
import { TsunAccordion } from "@/components/Accordion";
import { LayoutObraIndiceGeral } from "@/components/Layouts/ObraIndiceGeral";
import { Warning } from "@/components/Warning";
import { defaultMangas } from "@/constants/WorksDetails";
import { useRouter } from "next/router";

export default function Comic() {
  const { warnings } = useWarn();

  const router = useRouter();
  const { id } = router.query;

  const currentWork = defaultMangas.find((item) => item.id === id);
  // TODO: Alterar aqui quando o sistema de criar avisos for implantado
  const warningsElaina = warnings.filter(
    (item) => item.group === "bruxa-errante",
  );
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
            {warningsElaina.length > 0 &&
              warningsElaina.map((item, i) => (
                <Warning
                  key={i}
                  important={item.isImportant}
                  message={item.msg + " " + item.id}
                />
              ))}
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
